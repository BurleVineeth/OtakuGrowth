import { useState, useEffect, useMemo } from "react";
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
import { TaskType, type ScheduledTasks } from "./types";
import Dropdown from "@/components/ui/DropDown";
import DescriptionText from "@/components/ui/DescriptionText";
import { useAlert } from "@/context/AlertContext";
import { AlertVariant } from "@/components/ui/AlertModal";
import { getDailyScheduleKey, getWeeklyScheduleKey } from "@/utils";

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(({ user }: AppState) => user);
  const dispatch = useDispatch();
  const { openAlert } = useAlert();

  const [skill, setSkill] = useState<Skill>();
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTasks[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!user || !skillId) return;

    const fetchSkill = async () => {
      try {
        dispatch(showLoading());
        const date = new Date();
        const dailyKey = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const { data } = await apiService.get(`${BackendRoutes.SKILL}/${skillId}`, {
          params: { userId: user._id, dailyKey },
        });

        const allTasks: ScheduledTasks[] = data.data.tasks || [];
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

  const { completedTasks, pendingTasks, completedCount, pendingCount, completionPercentage } =
    useMemo(() => {
      const completed = scheduledTasks.filter((t) => t.completed);
      const pending = scheduledTasks.filter((t) => !t.completed);

      const total = scheduledTasks.length || 1; // avoid divide by zero

      return {
        completedTasks: completed,
        pendingTasks: pending,
        completedCount: completed.length,
        pendingCount: pending.length,
        completionPercentage: Math.round((completed.length / total) * 100),
      };
    }, [scheduledTasks]);

  if (!skill) return <div className="p-6 pt-20 text-(--text) text-center">Skill not found.</div>;

  const deleteSkill = async () => {
    try {
      dispatch(showLoading());
      await apiService.delete(`${BackendRoutes.DELETE_SKILL}/${skillId}`, {
        params: { public_id: skill.public_id },
      });
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

  const presentDeleteSkillAlert = () => {
    openAlert({
      title: "Delete Skill?",
      message: "Are you sure you want to delete this skill?",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: AlertVariant.DELETE,
      onConfirm: () => deleteSkill(),
    });
  };

  const completeTask = async (task: ScheduledTasks) => {
    try {
      dispatch(showLoading());

      const { type } = task;
      const scheduleKey =
        type === TaskType.DAILY
          ? getDailyScheduleKey()
          : type === TaskType.WEEKLY
            ? getWeeklyScheduleKey()
            : task.toString();

      await apiService.post(BackendRoutes.COMPLETE_TASK, {
        skill: task.skill,
        user: task.user,
        task: task._id,
        type: task.type,
        scheduleKey,
      });

      setScheduledTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: true } : t))
      );

      dispatch(
        presentToast({
          message: "Task completed!",
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

  const presentCompleteTaskAlert = (task: ScheduledTasks) => {
    openAlert({
      title: "Mark as Completed?",
      message: "Another step conquered on your path. Ready to mark this task as completed?",
      confirmText: "Complete",
      cancelText: "Cancel",
      variant: AlertVariant.COMPLETE,
      onConfirm: () => completeTask(task),
    });
  };

  return (
    <div className="w-full min-h-screen bg-(--bg) text-(--text)">
      {/* HERO */}
      <div className="relative w-full h-[78vh] overflow-hidden">
        {/* SETTINGS BUTTON */}
        <div className="absolute cursor-pointer top-6 right-6 z-20">
          <Dropdown
            trigger={
              <FiSettings
                className={`text-2xl cursor-pointer hover:brightness-90 transition-transform duration-300 hover:text-primary ${
                  showSettings ? "rotate-45" : "rotate-0"
                }`}
              />
            }
            animateAction={(value) => setShowSettings(value)}
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/${UIRoutes.SKILL}/${skill._id}/${UIRoutes.TASKS}`)}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition cursor-pointer"
              >
                Manage Tasks
              </button>

              <button
                onClick={() => navigate(`/${UIRoutes.MODIFY_SKILL}/${skill._id}`)}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition cursor-pointer"
              >
                Modify Skill
              </button>

              <button
                onClick={presentDeleteSkillAlert}
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
        <div className="absolute inset-0 bg-linear-to-t from-(--bg)/95 via-(--bg)/30 to-transparent" />
        <div className="absolute bottom-10 left-4 md:left-10 max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-4">{skill.name}</h1>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="px-4 py-2 rounded-lg">
              Category: <strong>{skill.category}</strong>
            </div>

            <div className="px-4 py-2 rounded-lg capitalize">
              Difficulty: <strong>{skill.difficulty}</strong>
            </div>

            {skill.createdAt && (
              <div className="px-4 py-2 rounded-lg opacity-70">
                Added On: {new Date(skill.createdAt).toDateString()}
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
            <DescriptionText text={skill.description} />
          </section>

          {/* ONLY SCHEDULED TASKS */}
          <section className="space-y-10">
            {/* Pending Tasks */}
            <div>
              <h2 className="text-3xl font-semibold text-(--warning)">Pending Tasks</h2>
              <div className="max-h-[500px] overflow-y-auto mt-4 pr-2 space-y-4 custom-scroll">
                {pendingTasks.length === 0 ? (
                  <p className="opacity-70 text-center py-6 text-(--text-secondary)">
                    No pending tasks.
                  </p>
                ) : (
                  pendingTasks.map((task) => (
                    <div
                      key={task._id}
                      className="p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors capitalize">
                          {task.name}
                        </h3>

                        {/* COMPLETE BUTTON */}
                        <button
                          onClick={() => presentCompleteTaskAlert(task)}
                          className="text-xs px-3 py-1 rounded bg-(--primary)/20 text-primary hover:bg-(--success) hover:text-white transition font-medium cursor-pointer"
                        >
                          Mark Complete
                        </button>
                      </div>

                      <p className="text-sm mt-1 text-(--text-secondary) leading-relaxed capitalize">
                        {task.description || "No description"}
                      </p>

                      <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs text-(--text-secondary)">
                        <span className="capitalize">
                          {task.type} • {task.duration || "—"} mins
                        </span>

                        <span className="opacity-60">
                          {new Date(task.createdAt).toDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Completed Tasks */}
            <div>
              <h2 className="text-3xl font-semibold text-(--success)">Completed Tasks</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2 mt-4 space-y-4 custom-scroll">
                {completedTasks.length === 0 ? (
                  <p className="opacity-50 text-center py-6 text-(--text-secondary)">
                    No completed tasks yet.
                  </p>
                ) : (
                  completedTasks.map((task) => (
                    <div
                      key={task._id}
                      className="p-5 rounded-xl border border-border bg-green-500/5 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    >
                      <h3 className="font-semibold text-lg group-hover:text-(--success) transition-colors capitalize">
                        {task.name}
                      </h3>

                      <p className="text-sm mt-1 text-(--text-secondary) leading-relaxed capitalize">
                        {task.description || "No description"}
                      </p>

                      <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs text-(--text-secondary)">
                        <span className="capitalize">
                          {task.type} • {task.duration || "—"} mins
                        </span>

                        <span className="opacity-60">
                          {new Date(task.createdAt).toDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>

        {/* OVERVIEW */}
        <aside className="bg-card border border-(--border)/60 rounded-2xl shadow-lg p-6 w-full max-w-sm h-fit sticky top-24">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Overview</h3>
            <div className="mt-1 h-0.5 w-10 bg-(--accent)/60 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {/* CATEGORY */}
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-60">Category</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-(--accent)/10 text-accent">
                {skill.category}
              </span>
            </div>

            {/* DIFFICULTY */}
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-60">Difficulty</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-(--text)/10 text-(--text) capitalize">
                {skill.difficulty}
              </span>
            </div>

            {/* ADDED */}
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-60">Added On</span>
              <span className="text-sm font-medium opacity-70">
                {skill.createdAt ? new Date(skill.createdAt).toDateString() : "—"}
              </span>
            </div>

            {/* TASK STATS */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Task Overview</h4>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-xl p-3 bg-(--bg-secondary) border border-border">
                  <p className="text-xs opacity-60">Completed</p>
                  <p className="text-lg font-bold text-(--success)">{completedCount}</p>
                </div>

                <div className="rounded-xl p-3 bg-(--bg-secondary) border border-border">
                  <p className="text-xs opacity-60">Pending</p>
                  <p className="text-lg font-bold text-(--warning)">{pendingCount}</p>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="mt-4">
                <p className="text-xs mb-2 opacity-70">Overall Progress</p>
                <div className="w-full h-3 bg-(--border)/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 opacity-70">{completionPercentage}% Done</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SkillDetail;
