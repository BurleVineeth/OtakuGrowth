import { FiBell, FiUser, FiMenu, FiTrendingUp, FiSettings, FiLogOut } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import { useState } from "react";
import { useTheme, type Theme } from "../../context/ThemeContext";
import Dropdown from "../ui/DropDown";
import MobileSidebar from "./MobileSidebar";

const themeOptions: { id: Theme; label: string }[] = [{ id: "purple", label: "Purple" }];

export default function Header() {
  const { setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-[var(--primary)] text-[var(--text)] px-4 py-3 flex items-center justify-between shadow-md">
        {/* LEFT → LOGO + MENU */}
        <div className="flex items-center gap-3">
          <FiMenu
            className="text-2xl cursor-pointer md:hidden hover:brightness-90 transition"
            onClick={() => setSidebarOpen(true)}
          />

          <h1 className="font-semibold flex items-end gap-1 leading-none">
            <span className="text-3xl tracking-wide">Otaku</span>
            <span className="text-xl opacity-90">Growth</span>
          </h1>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
            <button className="hover:text-[var(--text-secondary)] transition">My Tasks</button>
            <button className="hover:text-[var(--text-secondary)] transition">Library</button>
            <button className="hover:text-[var(--text-secondary)] transition">Work</button>

            <FiTrendingUp className="text-2xl cursor-pointer hover:brightness-90 transition" />
          </nav>

          {/* Theme Selector */}
          <Dropdown
            trigger={
              <FaPalette className="text-2xl cursor-pointer hover:brightness-90 transition" />
            }
          >
            <div className="flex flex-col gap-1 p-1">
              {themeOptions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--bg-secondary)] transition"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Dropdown>

          {/* Notifications */}
          <FiBell className="text-2xl cursor-pointer hover:brightness-90 transition" />

          {/* Profile Dropdown */}
          <Dropdown
            trigger={<FiUser className="text-2xl cursor-pointer hover:brightness-90 transition" />}
          >
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--bg-secondary)] transition">
                <FiUser className="text-lg" />
                Profile
              </button>

              <button className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--bg-secondary)] transition">
                <FiSettings className="text-lg" />
                Settings
              </button>

              <button className="flex items-center gap-3 p-2 rounded-md text-red-500 hover:bg-red-500/10 transition">
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          </Dropdown>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
