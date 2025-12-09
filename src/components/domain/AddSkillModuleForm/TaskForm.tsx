import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useForm, Controller, type UseFormReset } from "react-hook-form";
import { TaskType, type Task, type TaskFormValues } from "./types";
import { useDispatch } from "react-redux";
import { presentToast, TOAST_TYPES } from "@/redux/features";

interface TaskFormProps {
  onSave: (data: TaskFormValues, reset: UseFormReset<TaskFormValues>) => void;
  onCancel: () => void;
  task?: Task | null;
}

const TaskForm = ({ onSave, onCancel, task }: TaskFormProps) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<TaskFormValues>({
    defaultValues: {
      name: task?.name || "",
      type: task?.type || TaskType.DAILY,
      duration: task?.duration || undefined,
      description: task?.description || "",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    if (!isDirty) {
      dispatch(
        presentToast({
          message: "No changes made to save.",
          type: TOAST_TYPES.DEFAULT,
        })
      );

      return;
    }
    onSave(data, reset);
  };

  return (
    <div className="fixed inset-0 p-4 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card p-6 rounded-xl w-full max-h-full overflow-scroll max-w-md border border-border shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-primary">{`${task ? "Edit" : "Add New"} Task`}</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Task Name */}
          <div className="space-y-1">
            <label className="block font-medium text-(--text-secondary)">Task Name</label>

            <input
              {...register("name", {
                required: "⚔️ A warrior must be known by name! Declare your task, hero!",
                setValueAs: (v) => v.trim(),
              })}
              className="w-full p-3 rounded-lg border border-border bg-(--input-bg)
                       text-(--text) focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {errors.name && <p className="text-(--error) text-sm">{errors.name.message}</p>}
          </div>

          {/* Task Type */}
          <div className="flex flex-col">
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className="h-12 select p-3 rounded-lg bg-(--input-bg) border border-border
                               text-(--text) focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <SelectValue placeholder="Task type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value={TaskType.ONE_TIME}>One-time</SelectItem>
                    <SelectItem value={TaskType.DAILY}>Daily</SelectItem>
                    <SelectItem value={TaskType.WEEKLY}>Weekly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="block font-medium text-(--text-secondary)">Duration (minutes)</label>

            <input
              type="number"
              {...register("duration", {
                required: "⏳ Every quest needs time! Please specify the duration.",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "🔥 Even the shortest training must last at least 1 minute!",
                },
              })}
              className="w-full p-3 rounded-lg border border-border bg-(--input-bg)
                       text-(--text) focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {errors.duration && <p className="text-(--error) text-sm">{errors.duration.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block font-medium text-(--text-secondary)">Description / Notes</label>

            <textarea
              {...register("description", {
                required: "📝 A true hero records their journey! Please provide a description.",
                minLength: {
                  value: 10,
                  message: "📜 A brief note won't do! Share more details about your task.",
                },
                maxLength: {
                  value: 500,
                  message: "🚫 That's too much lore! Keep your description under 500 characters.",
                },
                setValueAs: (v) => v.trim(),
              })}
              className="w-full p-3 rounded-lg border border-border bg-(--input-bg)
                       text-(--text) min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {errors.description && (
              <p className="text-(--error) text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-border rounded-md text-(--text)
                         hover:bg-(--border)/80 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary rounded-md text-white
                         hover:bg-(--primary-dark) cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
