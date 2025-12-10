import { Trash2, Save, CheckCircle2 } from "lucide-react";

export enum AlertVariant {
  COMPLETE = "complete",
  DELETE = "delete",
  SAVE = "save",
}

interface AlertModalProps {
  open: boolean;
  variant?: AlertVariant;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantStyles = {
  delete: {
    Icon: Trash2,
    border: "border-red-300",
    iconBg: "bg-red-100 text-red-600",
    confirmBtn: "bg-red-600 hover:bg-red-700",
  },
  save: {
    Icon: Save,
    border: "border-blue-300",
    iconBg: "bg-blue-100 text-blue-600",
    confirmBtn: "bg-blue-600 hover:bg-blue-700",
  },
  complete: {
    Icon: CheckCircle2,
    border: "border-green-300",
    iconBg: "bg-green-100 text-green-600",
    confirmBtn: "bg-green-600 hover:bg-green-700",
  },
};

export default function AlertModal({
  open,
  variant = AlertVariant.DELETE,
  title = "Are you sure?",
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: AlertModalProps) {
  if (!open) return null;

  const style = variantStyles[variant];
  const Icon = style.Icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999">
      <div
        className={`bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm animate-scaleIn border ${style.border}`}
      >
        {/* Icon */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${style.iconBg}`}
          >
            <Icon size={22} />
          </div>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        {message && <p className="text-gray-600 mt-3">{message}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-400 text-gray-700 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white cursor-pointer ${style.confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
