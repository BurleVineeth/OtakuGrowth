import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ArrowLeft, Trash2, Pencil } from "lucide-react";
import type { Task, TaskFormValues } from "./types";
import TaskForm from "./TaskForm";
import { dismissLoading, presentToast, showLoading, TOAST_TYPES } from "@/redux/features";
import { apiService } from "@/services/api.service";
import { BackendRoutes } from "@/constants";
import type { AppState } from "@/redux/store";
import type { UseFormReset } from "react-hook-form";

export default function SkillTasks() {
  const { skillId } = useParams();
  const user = useSelector(({ user }: AppState) => user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ----------------------------
  // FETCH TASKS
  // ----------------------------
  const getTasks = async () => {
    try {
      dispatch(showLoading());

      const { data: tasksData } = await apiService.get(BackendRoutes.TASKS, {
        params: { skillId, userId: user?._id },
      });

      setTasks(tasksData.data.tasks);
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

  const createTask = (data: TaskFormValues) => {
    return apiService.post(BackendRoutes.ADD_TASK, {
      ...data,
      user: user?._id,
      skill: skillId,
    });
  };

  const updateTask = (taskId: string, data: TaskFormValues) => {
    return apiService.put(`${BackendRoutes.UPDATE_TASK}/${taskId}`, {
      ...data,
      user: user?._id,
      skill: skillId,
    });
  };

  const deleteTask = async (taskId: string) => {
    try {
      dispatch(showLoading());
      await apiService.delete(`${BackendRoutes.TASKS}/${taskId}`);

      dispatch(
        presentToast({
          message: "Task deleted",
          type: TOAST_TYPES.SUCCESS,
        })
      );

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
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
        const { data: updatedTaskData } = await updateTask(selectedTask._id, taskData);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? updatedTaskData.data.task : task
          )
        );
        dispatch(
          presentToast({
            message: "Task updated successfully",
            type: TOAST_TYPES.SUCCESS,
          })
        );
      } else {
        const { data: newTaskData } = await createTask(taskData);
        setTasks((prevTasks) => [...prevTasks, newTaskData.data.task]);
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

  const openCreateForm = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  return (
    <div
      className="
        p-6 max-w-3xl mx-auto min-h-screen
        text-[var(--text)]
        bg-[var(--bg)]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm
              border border-[var(--border)]
              bg-[var(--card)]
              hover:bg-[var(--bg-secondary)]
              transition-all shadow-sm cursor-pointer
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--primary)]">
            Manage Tasks
          </h1>
        </div>

        <button
          onClick={openCreateForm}
          className="
            flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-[var(--primary)] text-white
            hover:bg-[var(--primary-dark)]
            transition-all shadow cursor-pointer
          "
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Task Form Modal */}
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

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-16 text-[var(--text-secondary)] text-lg">
            No tasks added yet.
            <br />
            <span className="text-sm">
              Click <strong>Add Task</strong> to begin.
            </span>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="
                p-6 flex justify-between items-start
                bg-[var(--card)]
                border border-[var(--border)]
                rounded-2xl shadow-sm
              "
            >
              {/* Task content */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">{task.name}</h3>

                <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {task.description}
                </p>

                <div className="mt-3 flex items-center flex-wrap gap-3">
                  <span
                    className="
                      px-2.5 py-1 text-xs rounded-md
                      bg-[var(--bg-secondary)]
                      border border-[var(--border)]
                      text-[var(--text-secondary)] capitalize
                    "
                  >
                    {task.type}
                  </span>

                  {task.duration && (
                    <span
                      className="
                        px-2.5 py-1 text-xs rounded-md
                        bg-[var(--bg-secondary)]
                        border border-[var(--border)]
                        text-[var(--text-secondary)]
                      "
                    >
                      {task.duration} min
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => openEditForm(task)}
                  className="
                    p-2.5 rounded-xl
                    border border-[var(--border)]
                    hover:bg-[var(--bg-secondary)]
                    transition cursor-pointer
                  "
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="
                    p-2.5 rounded-xl
                    border border-[var(--danger)]
                    text-[var(--danger)]
                    hover:bg-[var(--danger)]
                    hover:text-white
                    transition cursor-pointer
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
