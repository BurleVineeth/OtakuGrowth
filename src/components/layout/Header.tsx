import { FiBell, FiUser, FiMenu, FiTrendingUp, FiSettings, FiLogOut } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import { useState } from "react";
import { useTheme, type Theme } from "../../context/ThemeContext";
import Dropdown from "../ui/DropDown";
import MobileSidebar from "./MobileSidebar";
import { BackendRoutes, LocalStorageKeys, UIRoutes } from "../../constants";
import { useDispatch } from "react-redux";
import { presentToast, TOAST_TYPES } from "../../redux/features/ToastSlice";
import { apiService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { dismissLoading, showLoading } from "../../redux/features/LoaderSlice";

const themeOptions: { id: Theme; label: string }[] = [{ id: "purple", label: "Purple" }];

export default function Header() {
  const { setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatch(showLoading());

      const { data: res } = await apiService.post(BackendRoutes.LOGOUT);
      localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);

      navigate(`/${UIRoutes.LOGIN}`);
      dispatch(
        presentToast({
          message: res.message,
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
    <>
      <header className="w-full bg-[var(--primary)] text-[var(--text)] px-4 py-3 flex items-center justify-between shadow-md">
        {/* LEFT → LOGO + MENU */}
        <div className="flex items-center gap-3">
          <FiMenu
            className="text-2xl cursor-pointer md:hidden hover:brightness-90 transition"
            onClick={() => setSidebarOpen(true)}
          />

          {/* TITLE + NAV WRAPPER */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6">
            <h1
              onClick={() => navigate(`/`)}
              className="font-semibold flex items-baseline gap-1 leading-none cursor-pointer"
            >
              <span className="text-3xl tracking-wide">Otaku</span>
              <span className="text-xl opacity-90">Growth</span>
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-baseline gap-6 text-[15px] font-medium">
              <button className="hover:text-[var(--text-secondary)] transition cursor-pointer">
                My Tasks
              </button>
              <button className="hover:text-[var(--text-secondary)] transition cursor-pointer">
                Library
              </button>
              <button className="hover:text-[var(--text-secondary)] transition cursor-pointer">
                Work
              </button>
              <button
                onClick={() => navigate(`/${UIRoutes.ABOUT}`)}
                className="hover:text-[var(--text-secondary)] transition cursor-pointer"
              >
                About
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex items-center gap-6">
          <FiTrendingUp className="hidden md:flex text-2xl cursor-pointer hover:brightness-90 transition" />
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

              <button
                className="flex items-center gap-3 p-2 rounded-md text-red-500 hover:bg-red-500/10 transition"
                onClick={logout}
              >
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
