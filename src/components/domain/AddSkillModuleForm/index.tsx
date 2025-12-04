import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModuleSchema, SkillDifficulty, type CreateModuleType, type EditModuleType } from "./types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "@/redux/store";
import { apiService } from "@/services/api.service";
import { BackendRoutes, FILE_UPLOAD_TYPES, UIRoutes } from "@/constants";
import {
  dismissLoading,
  presentToast,
  showLoading,
  type Skill,
  TOAST_TYPES,
} from "@/redux/features";
import { useNavigate, useParams } from "react-router-dom";

export default function AddSkillModuleForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const user = useSelector(({ user }: AppState) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { skillId } = useParams();
  const [selectedSkill, setSelectedSkill] = useState<Skill>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreateModuleType | EditModuleType>({
    resolver: zodResolver(ModuleSchema(!!skillId)),
    defaultValues: {
      name: "",
      description: "",
      difficulty: SkillDifficulty.BEGINNER,
      category: "",
      coverPhoto: undefined,
    },
  });

  useEffect(() => {
    if (!skillId || !user) {
      return;
    }

    const getSkill = async () => {
      const { data: skillData } = await apiService.get(`${BackendRoutes.SINGLE_SKILL}/${skillId}`, {
        params: { userId: user._id },
      });

      const skill = skillData.data.skill;
      setSelectedSkill(skill);
      reset({
        name: skill?.name ?? "",
        description: skill?.description ?? "",
        difficulty: skill?.difficulty ?? SkillDifficulty.BEGINNER,
        category: skill?.category ?? "",
        coverPhoto: undefined,
      });

      setPreview(skill.url ?? null);
    };

    getSkill();

    return () => {
      setSelectedSkill(undefined);
      setPreview(null);
    };
  }, [reset, skillId, user]);

  const currentLevel = watch("difficulty");

  const submitModule = async (moduleData: CreateModuleType | EditModuleType) => {
    try {
      dispatch(showLoading());

      const { coverPhoto, ...skillData } = moduleData;

      const { data: coverPhotoInfo } =
        coverPhoto && coverPhoto.length === undefined
          ? await apiService.uploadFile(
              coverPhoto,
              selectedSkill?.public_id ? FILE_UPLOAD_TYPES.REPLACE : FILE_UPLOAD_TYPES.UPLOAD,
              {
                public_id: selectedSkill?.public_id,
              }
            )
          : { data: { data: {} } };

      const skillModulePayload = {
        ...skillData,
        ...coverPhotoInfo.data,
        user: user?._id,
      };

      const { data: res } = await (skillId
        ? apiService.put(`${BackendRoutes.UPDATE_SKILL}/${skillId}`, skillModulePayload)
        : apiService.post(BackendRoutes.ADD_SKILL, skillModulePayload));

      const id = res.data.skill._id;
      navigate(`/${UIRoutes.SKILL}/${id}`);

      dispatch(
        presentToast({
          message: "Skill added successfully!",
          type: TOAST_TYPES.SUCCESS,
        })
      );
    } catch (error) {
      dispatch(
        presentToast({
          message: apiService.getErrorMessage(error as Error),
          type: TOAST_TYPES.ERROR,
        })
      );
    } finally {
      dispatch(dismissLoading());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("coverPhoto", file, { shouldValidate: true }); // important: triggers validation
    }
  };

  return (
    <div className="w-full flex justify-center text-[var(--text)] py-10 px-4">
      <form
        onSubmit={handleSubmit(submitModule)}
        className="w-full max-w-3xl space-y-8 bg-[var(--bg-secondary)]/40 rounded-xl p-8 
                   shadow-[0_0_20px_var(--shadow)] backdrop-blur-lg border border-[var(--border)]"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold tracking-wide text-center text-[var(--primary)] drop-shadow-[0_0_12px_var(--shadow-strong)] mb-2">
          Add a New Skill to Your Arsenal
        </h1>
        <p className="text-center text-[var(--text-secondary)] text-sm -mt-2">
          Strengthen your skill set by forging a new technique.
        </p>

        {/* Skill Title */}
        <div className="space-y-1">
          <label className="block font-medium text-[var(--text-secondary)]">Skill Title</label>
          <input
            {...register("name", { setValueAs: (v) => v.trim() })}
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] 
                       text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="Ex: Learning, Weight Gain, Improve Focus, Time Management…"
          />
          {errors.name && <p className="text-[var(--error)] text-sm">{errors.name?.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block font-medium text-[var(--text-secondary)]">
            Skill Description
          </label>
          <textarea
            {...register("description", { setValueAs: (v) => v.trim() })}
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] 
                       text-[var(--text)] min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="Describe the essence, effect, or origin of this skill…"
          />
          {errors.description && (
            <p className="text-[var(--error)] text-sm">{errors.description?.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="block font-medium text-[var(--text-secondary)]">Skill Category</label>
          <input
            {...register("category", { setValueAs: (v) => v.trim() })}
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] 
                       text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="Productivity | Fitness | Learning | Mindset | Nutrition…"
          />
          {errors.category && (
            <p className="text-[var(--error)] text-sm">{errors.category?.message}</p>
          )}
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="block font-medium text-[var(--text-secondary)]">Difficulty Level</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["beginner", "intermediate", "advanced"].map((level) => (
              <label
                key={level}
                className={`p-3 rounded-lg border cursor-pointer flex flex-col gap-2 ${
                  currentLevel === level
                    ? "border-[var(--primary)] bg-[var(--primary)]/10"
                    : "border-[var(--option-border)] bg-[var(--bg-secondary)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-[var(--text)] capitalize">{level}</div>

                  <input
                    type="radio"
                    value={level}
                    {...register("difficulty")}
                    className="cursor-pointer h-2 w-2 appearance-none rounded-full border-2 border-[var(--border)] checked:border-[var(--primary)] checked:bg-[var(--primary)] transition-all duration-300 ease-out scale-100 checked:scale-110"
                    readOnly
                  />
                </div>
              </label>
            ))}
          </div>
          {errors.difficulty && (
            <p className="text-[var(--error)] text-sm">{errors.difficulty?.message}</p>
          )}
        </div>

        {/* Cover Photo Upload */}
        <div className="space-y-2">
          <label className="block font-medium text-[var(--text-secondary)]">Cover Photo</label>

          <div
            className={`relative w-full h-48 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors duration-200 ${preview ? "border-[var(--primary)] bg-[var(--bg-tertiary)]/30" : "border-[var(--border)] bg-[var(--input-bg)]"} hover:border-[var(--primary)] hover:bg-[var(--bg-tertiary)]`}
            onClick={() => document.getElementById("cover-photo-input")?.click()}
          >
            {!preview && (
              <p className="text-[var(--text-secondary)] text-center">
                Click to upload a cover photo
              </p>
            )}

            {preview && (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="Cover Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <input
            id="cover-photo-input"
            type="file"
            accept="image/*"
            {...register("coverPhoto")}
            onChange={handleFileChange}
            className="hidden"
          />

          {errors.coverPhoto && typeof errors.coverPhoto.message === "string" && (
            <p className="text-[var(--error)] text-sm">{errors.coverPhoto.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-[var(--text)] bg-[var(--primary)] w-full cursor-pointer hover:bg-[var(--primary-dark)]"
        >
          Save Skill
        </button>
      </form>
    </div>
  );
}
