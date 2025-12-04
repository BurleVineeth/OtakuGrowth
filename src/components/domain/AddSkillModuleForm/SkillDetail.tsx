import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiService } from "@/services/api.service";
import { FiSettings } from "react-icons/fi";
import {
  showLoading,
  dismissLoading,
  presentToast,
  TOAST_TYPES,
  type Skill,
} from "@/redux/features";
import { BackendRoutes, UIRoutes } from "@/constants";
import type { AppState } from "@/redux/store";
import { type Task } from "./types";
import Dropdown from "@/components/ui/DropDown";

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(({ user }: AppState) => user);
  const dispatch = useDispatch();

  const [skill, setSkill] = useState<Skill>();
  const [scheduledTasks, setScheduledTasks] = useState<Task[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!user || !skillId) return;

    const fetchSkill = async () => {
      try {
        dispatch(showLoading());
        const { data } = await apiService.get(`${BackendRoutes.SKILL}/${skillId}`, {
          params: { userId: user._id },
        });

        const allTasks: Task[] = data.data.tasks || [];
        setScheduledTasks(allTasks);
        setSkill(data.data.skill);
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

    fetchSkill();
  }, [user, skillId, dispatch]);

  if (!skill)
    return <div className="p-6 pt-20 text-[var(--text)] text-center">Skill not found.</div>;

  const deleteSkill = async () => {
    try {
      dispatch(showLoading());
      await apiService.delete(`${BackendRoutes.DELETE_SKILL}/${skillId}`);
      navigate(`/${UIRoutes.HOME}`);

      dispatch(
        presentToast({
          message: "Skill deleted",
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

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* HERO */}
      <div className="relative w-full h-[78vh] overflow-hidden">
        {/* SETTINGS BUTTON */}
        <div className="absolute cursor-pointer top-6 right-6 z-20">
          <Dropdown
            trigger={
              <FiSettings
                className={`text-2xl cursor-pointer hover:brightness-90 transition-transform duration-300 ${
                  showSettings ? "rotate-45" : "rotate-0"
                }`}
              />
            }
            animateAction={(value) => setShowSettings(value)}
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/${UIRoutes.SKILL}/${skill._id}/${UIRoutes.TASKS}`)}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--accent)] transition cursor-pointer"
              >
                Manage Tasks
              </button>

              <button
                onClick={() => navigate(`/${UIRoutes.MODIFY_SKILL}/${skill._id}`)}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--accent)] transition cursor-pointer"
              >
                Modify Skill
              </button>

              <button
                onClick={deleteSkill}
                className="flex items-center gap-3 p-2 rounded-md text-red-500 hover:bg-red-500/10 transition cursor-pointer"
              >
                Delete Skill
              </button>
            </div>
          </Dropdown>
        </div>

        <img
          src={skill.url}
          alt={skill.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/95 via-[var(--bg)]/30 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-4">{skill.name}</h1>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="px-4 py-2 bg-[var(--card)] rounded-lg border border-[var(--border)]/50">
              Category: <strong>{skill.category}</strong>
            </div>

            <div className="px-4 py-2 bg-[var(--card)] rounded-lg border border-[var(--border)]/50 capitalize">
              Difficulty: <strong>{skill.difficulty}</strong>
            </div>

            {skill.createdAt && (
              <div className="px-4 py-2 bg-[var(--card)] rounded-lg border border-[var(--border)]/50 opacity-70">
                Added On: {new Date(skill.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* MAIN */}
        <div className="lg:col-span-2 space-y-14">
          <section>
            <h2 className="text-3xl font-semibold mb-4">About</h2>
            <p className="text-[1.1rem] opacity-80 leading-relaxed">{skill.description}</p>
          </section>

          {/* ONLY SCHEDULED TASKS */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Scheduled Tasks</h2>

            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scroll">
              {scheduledTasks.length === 0 ? (
                <p className="opacity-70 text-center py-6 text-[var(--text-secondary)]">
                  No scheduled tasks.
                </p>
              ) : (
                scheduledTasks.map((task) => (
                  <div
                    key={task._id}
                    className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm hover:shadow-md transition-shadow duration-300 hover:border-[var(--primary)] group cursor-pointer"
                  >
                    <h3 className="font-semibold text-lg group-hover:text-[var(--primary)] transition-colors capitalize">
                      {task.name}
                    </h3>

                    <p className="text-sm mt-1 text-[var(--text-secondary)] leading-relaxed capitalize">
                      {task.description || "No description"}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--text-secondary)]">
                      <span className="capitalize">
                        {task.type} • {task.duration || "—"} mins
                      </span>

                      <span className="opacity-60">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* OVERVIEW */}
        <aside className="bg-[var(--card)] border border-[var(--border)]/60 rounded-2xl shadow-lg p-6 w-full max-w-sm h-fit sticky top-24">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Overview</h3>
            <div className="mt-1 h-0.5 w-10 bg-[var(--accent)]/60 rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-60">Category</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                {skill.category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-60">Difficulty</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-[var(--text)]/10 text-[var(--text)] capitalize">
                {skill.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm opacity-60">Added On</span>
              <span className="text-sm font-medium opacity-70">
                {skill.createdAt ? new Date(skill.createdAt).toLocaleDateString() : "—"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm opacity-60">Scheduled Tasks</span>
              <span className="text-sm font-medium opacity-70">{scheduledTasks.length}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SkillDetail;
