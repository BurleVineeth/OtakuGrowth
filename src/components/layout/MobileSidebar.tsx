import { FiX, FiList, FiBook, FiBriefcase, FiTrendingUp } from "react-icons/fi";

export default function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-(--bg)/50" onClick={onClose} />

      {/* Sidebar Panel */}
      <div className="absolute left-0 top-0 h-full w-64 bg-(--bg) text-(--text) p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>

          <FiX
            className="text-2xl cursor-pointer hover:brightness-90 transition"
            onClick={onClose}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-5 text-lg">
          <button className="flex items-center gap-3 hover:text-(--text-secondary) transition">
            <FiList className="text-xl" /> My Tasks
          </button>

          <button className="flex items-center gap-3 hover:text-(--text-secondary) transition">
            <FiBook className="text-xl" /> Library
          </button>

          <button className="flex items-center gap-3 hover:text-(--text-secondary) transition">
            <FiBriefcase className="text-xl" /> Work
          </button>

          <button className="flex items-center gap-3 hover:text-(--text-secondary) transition">
            <FiTrendingUp className="text-xl" /> Progress
          </button>
        </nav>
      </div>
    </div>
  );
}
