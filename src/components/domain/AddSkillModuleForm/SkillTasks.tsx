import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ArrowLeft, Wrench, Search, Scissors } from "lucide-react";
import TaskForm from "./TaskForm";
import { apiService } from "@/services/api.service";
import {
  dismissLoading,
  presentToast,
  showLoading,
  TOAST_TYPES,
  type Skill,
} from "@/redux/features";
import type { AppState } from "@/redux/store";
import type { Task, TaskFormValues } from "./types";
import type { UseFormReset } from "react-hook-form";
import { BackendRoutes } from "@/constants";
import DescriptionText from "@/components/ui/DescriptionText";
import { useAlert } from "@/context/AlertContext";
import { AlertVariant } from "@/components/ui/AlertModal";

// Icon Button Style
const iconButton =
  "relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full \
   bg-[var(--bg-secondary)]/40 backdrop-blur-md border border-[var(--border)] \
   hover:bg-[var(--primary)]/15 transition-all duration-300 group overflow-hidden cursor-pointer";

export default function SkillTasks() {
  const { skillId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openAlert } = useAlert();

  const user = useSelector(({ user }: AppState) => user);

  const [skill, setSkill] = useState<Skill | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Search + Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState("all");

  const getTasks = async () => {
    try {
      dispatch(showLoading());

      const { data } = await apiService.get(`${BackendRoutes.SKILL}/${skillId}`, {
        params: { userId: user?._id },
      });

      setTasks(data.data.tasks);
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

  useEffect(() => {
    if (!skillId || !user?._id) return;
    getTasks();
  }, [skillId, user]);

  const createTask = (data: TaskFormValues) =>
    apiService.post(BackendRoutes.ADD_TASK, {
      ...data,
      user: user?._id,
      skill: skillId,
    });

  const updateTask = (taskId: string, data: TaskFormValues) =>
    apiService.put(`${BackendRoutes.UPDATE_TASK}/${taskId}`, {
      ...data,
      user: user?._id,
      skill: skillId,
    });

  const deleteTask = async (taskId: string) => {
    try {
      dispatch(showLoading());
      await apiService.delete(`${BackendRoutes.TASKS}/${taskId}`);

      setTasks((prev) => prev.filter((t) => t._id !== taskId));

      dispatch(presentToast({ message: "Task deleted", type: TOAST_TYPES.SUCCESS }));
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

  const handleSave = async (taskData: TaskFormValues, reset: UseFormReset<TaskFormValues>) => {
    try {
      dispatch(showLoading());

      if (selectedTask) {
        const { data } = await updateTask(selectedTask._id, taskData);
        setTasks((prev) => prev.map((t) => (t._id === selectedTask._id ? data.data.task : t)));

        dispatch(
          presentToast({
            message: "Task updated successfully",
            type: TOAST_TYPES.SUCCESS,
          })
        );
      } else {
        const { data } = await createTask(taskData);
        setTasks((prev) => [...prev, data.data.task]);

        dispatch(
          presentToast({
            message: "Task created successfully",
            type: TOAST_TYPES.SUCCESS,
          })
        );
      }

      reset();
      setIsFormOpen(false);
      setSelectedTask(null);
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

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => task.name.toLowerCase().includes(search.toLowerCase()))
      .filter((task) => (typeFilter === "all" ? true : task.type === typeFilter))
      .filter((task) =>
        durationFilter === "all"
          ? true
          : durationFilter === "short"
            ? (task.duration ?? 0) <= 30
            : durationFilter === "medium"
              ? (task.duration ?? 0) > 30 && (task.duration ?? 0) <= 180
              : (task.duration ?? 0) > 180
      );
  }, [tasks, search, typeFilter, durationFilter]);

  const presentDeleteSkillAlert = (taskId: string) => {
    openAlert({
      title: "Delete Task?",
      message: "Are you sure you want to delete this task?",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: AlertVariant.DELETE,
      onConfirm: () => deleteTask(taskId),
    });
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)] pb-20 overflow-x-hidden">
      {/* ------------------------------ HEADER ------------------------------ */}
      {skill && (
        <div className="relative w-full h-56 md:h-72 rounded-b-3xl overflow-hidden shadow-lg">
          <img src={skill.url} alt={skill.name} className="w-full h-full object-cover opacity-80" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-black/20" />

          <div className="absolute bottom-5 left-4 right-4">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight break-words">
              {skill.name}
            </h1>
            <DescriptionText text={skill.description} />
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-2 left-4 p-3 rounded-xl 
              bg-black/40 backdrop-blur-md border border-white/10
              hover:bg-black/60 transition-all cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      )}

      {/* ------------------------------ CONTROLS ------------------------------ */}
      {/* ------------------------------ CONTROLS ------------------------------ */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search */}
          <div
            className="flex-1 w-full md:w-1/3 flex items-center gap-3 px-4 py-3 rounded-xl 
                    bg-[var(--bg-secondary)] border border-[var(--border)] 
                    focus-within:border-[var(--primary)]"
          >
            <Search size={18} className="opacity-50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Filters + Add Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            {/* Filters */}
            <div className="flex flex-row gap-3 flex-1 md:flex-none flex-wrap h-12">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 min-w-[120px] max-w-[200px] bg-[var(--bg-secondary)] border border-[var(--border)]
               rounded-xl text-sm focus:border-[var(--primary)] focus:outline-none truncate
               overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="oneTime">One Time</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>

              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="px-4 py-2 min-w-[120px] max-w-[200px] bg-[var(--bg-secondary)] border border-[var(--border)]
               rounded-xl text-sm focus:border-[var(--primary)] focus:outline-none truncate
               overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="short">≤ 30 min</option>
                <option value="medium">30 min - 3hrs</option>
                <option value="long">More time</option>
              </select>
            </div>

            {/* Add Task Button */}
            <button
              onClick={() => {
                setSelectedTask(null);
                setIsFormOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)]
                   text-white hover:bg-[var(--primary-dark)] shadow-md transition-all flex-shrink-0 text-sm cursor-pointer"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* -------------- FORM MODAL (unchanged JSX) -------------- */}
      {isFormOpen && (
        <TaskForm
          task={selectedTask}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedTask(null);
          }}
        />
      )}

      {/* ------------------------------ TASK LIST ------------------------------ */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-4 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 opacity-60">
            <h3 className="text-lg font-medium">No tasks found</h3>
            <p className="text-sm mt-1">Try adjusting filters or add a new task.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="group w-full p-5 md:p-6 rounded-2xl bg-[var(--card)] 
              border border-[var(--border)] shadow-[0_0_15px_rgba(255,255,255,0.05)]
              relative overflow-hidden hover:shadow-[0_0_25px_rgba(164,85,247,0.25)] 
              transition-all duration-300 ease-out hover:border-[var(--primary)]"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 
                pointer-events-none bg-gradient-to-br 
                from-[var(--primary)/15] to-transparent blur-xl 
                transition-all duration-500"
              />

              <div className="relative z-10 flex justify-between items-start gap-4">
                {/* CONTENT */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg md:text-xl font-semibold tracking-wide 
                    group-hover:text-[var(--primary)] transition-colors break-words"
                  >
                    {task.name}
                  </h3>

                  {task.description && (
                    <p className="text-sm opacity-70 mt-1 leading-relaxed break-words overflow-hidden">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-3 md:mt-4 flex gap-2 flex-wrap">
                    <span
                      className="px-3 py-1 text-xs rounded-lg bg-[var(--bg-secondary)]
                      border border-[var(--border)] tracking-wide capitalize shadow-inner"
                    >
                      {task.type}
                    </span>

                    {task.duration && (
                      <span
                        className="px-3 py-1 text-xs rounded-lg bg-[var(--bg-secondary)] 
                        border border-[var(--border)] shadow-inner"
                      >
                        {task.duration} min
                      </span>
                    )}
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsFormOpen(true);
                    }}
                    className={iconButton}
                  >
                    <span
                      className="absolute inset-0 rounded-full opacity-0 
                      group-hover:opacity-100 bg-gradient-to-tr 
                      from-[var(--primary)]/30 to-transparent blur-md transition-all"
                    />

                    <Wrench size={18} className="relative z-10 group-hover:text-[var(--primary)]" />
                  </button>

                  <button
                    onClick={() => presentDeleteSkillAlert(task._id)}
                    className={`${iconButton}`}
                  >
                    <span
                      className="absolute inset-0 rounded-full opacity-0 
                      group-hover:opacity-100 bg-gradient-to-tr 
                      from-[var(--danger)]/30 to-transparent blur-md transition-all"
                    />

                    <Scissors
                      size={18}
                      className="relative z-10 group-hover:text-[var(--danger)]"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
