import { useEffect } from "react";

interface FullScreenImageViewerProps {
  src: string;
  open: boolean;
  onClose: () => void;
}

export default function FullScreenImageViewer({ src, open, onClose }: FullScreenImageViewerProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-9999 animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90%] max-h-[90%] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Full View"
          className="max-h-[90vh] w-auto rounded-lg shadow-lg cursor-default"
        />

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 text-white bg-primary rounded-full w-9 h-9 flex items-center justify-center text-lg shadow cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
