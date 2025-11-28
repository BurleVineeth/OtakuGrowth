import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { apiService } from "../../services/api.service";
import { BackendRoutes } from "../../constants";
import {
  dismissLoading,
  presentToast,
  refetchUser,
  showLoading,
  TOAST_TYPES,
  type UserInitialState,
} from "../../redux/features";

interface EditProfileFormData {
  name: string;
  email: string;
  bio: string;
  url: string;
  public_id: string;
  fileType: string;
}

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: UserInitialState;
}

export default function EditProfileModal({ open, onClose, user }: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
    getValues,
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
      url: user?.url ?? "",
      public_id: user?.public_id ?? "",
      fileType: user?.fileType ?? "",
    },
  });

  const image = watch("url");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      reset({
        name: user?.name ?? "",
        email: user?.email ?? "",
        bio: user?.bio ?? "",
        url: user?.url ?? "",
        public_id: user?.public_id ?? "",
        fileType: user?.fileType ?? "",
      });
    }
  }, [open, user, reset]);

  // Prevent background scroll
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    setSelectedImage(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setSelectedImage(file);
    setValue("url", url);
  };

  const removePhoto = () => {
    setValue("url", "");
    setSelectedImage(null);
  };

  const onSubmit = async (data: EditProfileFormData) => {
    const isImageChanged = (user.url || getValues("url")) && user.url !== getValues("url");

    if (!isDirty && !selectedImage && !isImageChanged) {
      dispatch(
        presentToast({
          message: "No changes to update",
          type: TOAST_TYPES.DEFAULT,
        })
      );

      return;
    }

    try {
      dispatch(showLoading());

      const getImageInfo = async (imageFile: File | null) => {
        const formData = new FormData();
        if (imageFile) formData.append("file", imageFile);
        if (user.public_id) formData.append("old_public_id", user.public_id);

        return apiService.post(BackendRoutes.REPLACE_FILE, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      };

      const imageInfo =
        selectedImage || isImageChanged ? (await getImageInfo(selectedImage)).data.data : {};

      const { data: res } = await apiService.post(BackendRoutes.UPDATE_USER, {
        _id: user._id,
        ...data,
        ...imageInfo,
      });

      onClose();
      dispatch(
        presentToast({
          message: res.message,
          type: TOAST_TYPES.SUCCESS,
        })
      );
      dispatch(refetchUser());
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

  const inputClasses =
    "p-2 rounded-md bg-[var(--bg)] text-[var(--text)] border border-[var(--primary)]/30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none ml-2";
  const errorClasses = "text-xs text-red-400 ml-2 p2";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="
          w-full max-w-md p-6 rounded-xl 
          bg-[var(--bg-secondary)] shadow-primary
          border border-[var(--primary)]/30
          animate-[fadeIn_0.2s_ease,scaleIn_0.2s_ease]
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-[var(--text)]">Edit Profile</h2>

          <button
            onClick={onClose}
            className="text-[var(--text)] hover:text-[var(--primary)] cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Avatar */}
        <div className="w-full flex flex-col items-center mb-4">
          <img
            src={image || "https://i1.sndcdn.com/artworks-id2NlcBPktu4bz9o-BfaBvA-t500x500.jpg"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-[var(--primary)] object-cover mb-3"
          />

          <label className="cursor-pointer text-[var(--primary)] text-sm hover:underline">
            Change Photo
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>

          {image && (
            <button onClick={removePhoto} className="text-xs text-red-400 mt-1 hover:underline">
              Remove Photo
            </button>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2"
        >
          {/* Name */}
          <label className="flex flex-col">
            <span className="text-sm text-[var(--text-secondary)] mb-1">Name</span>
            <input
              className={inputClasses}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Username cannot exceed 30 characters",
                },
                setValueAs: (v) => v.trim(),
              })}
            />
            {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="text-sm text-[var(--text-secondary)] mb-1">Email</span>
            <input
              type="email"
              className={inputClasses}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
                setValueAs: (v) => v.trim(),
              })}
            />
            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
          </label>

          {/* Bio */}
          <label className="flex flex-col">
            <span className="text-sm text-[var(--text-secondary)] mb-1">Bio</span>
            <textarea
              className={`${inputClasses} resize-none h-24`}
              {...register("bio", {
                setValueAs: (v) => v.trim(),
              })}
              placeholder="Tell something about yourself..."
            />
          </label>

          {/* Save Button */}
          <button
            type="submit"
            className="
              w-full mt-4 py-2 rounded-md 
              bg-[var(--primary)] text-white font-medium 
              hover:opacity-90 transition cursor-pointer
            "
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
