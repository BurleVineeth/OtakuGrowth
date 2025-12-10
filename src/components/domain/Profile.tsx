import { AiFillLock } from "react-icons/ai";
import { useSelector } from "react-redux";
import type { AppState } from "../../redux/store";
import { useState } from "react";
import EditProfileModal from "./EditProfile";
import { StaticImageUrls } from "../../constants";
import { useImageViewer } from "@/context/ImageViewerContext";

export default function Profile() {
  const user = useSelector(({ user }: AppState) => user);
  const [isOpen, setIsOpen] = useState(false);
  const { openImage } = useImageViewer();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-6 sm:gap-8">
      {/* Profile Header */}
      <div
        className="p-4 sm:p-6 rounded-2xl bg-(--bg-secondary) shadow-primary 
                      flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 
                      border border-border hover:shadow-lg transition-all"
      >
        <img
          src={user?.url || StaticImageUrls.DEFAULT_PROFILE}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-md cursor-pointer"
          onClick={() => openImage(user?.url || StaticImageUrls.DEFAULT_PROFILE)}
        />

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-(--text) leading-tight">
            {user?.name}
          </h1>

          <p className="text-sm text-(--text-secondary)">{user?.email}</p>

          <button
            className="mt-3 px-5 py-2 w-full sm:w-auto rounded-lg bg-primary 
                       text-white text-sm font-medium shadow-md hover:scale-105 
                       hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Edit Profile
          </button>

          {user && <EditProfileModal open={isOpen} onClose={() => setIsOpen(false)} user={user} />}
        </div>
      </div>

      {/* Theme Selector */}
      <div className="p-4 sm:p-6 rounded-2xl bg-(--bg-secondary) shadow-primary border border-border">
        <h2 className="text-lg sm:text-xl font-semibold text-(--text) mb-4">Themes</h2>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4">
          <div className="relative h-14 cursor-pointer hover:scale-102">
            <button className="w-full h-full rounded-xl bg-purple-500 shadow-sm" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs text-white rounded-xl font-medium">
              Purple
            </span>
          </div>

          {/* Blue Premium */}
          <div className="relative h-14 cursor-not-allowed">
            <button className="w-full h-full rounded-xl bg-blue-500 opacity-40 shadow-sm" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs text-white bg-black/50 backdrop-blur-sm rounded-xl font-medium">
              <AiFillLock className="text-white animate-lockPulse mr-1 sm:mr-2" />
              Premium
            </span>
          </div>

          {/* Red Premium */}
          <div className="relative h-14 cursor-not-allowed">
            <button className="w-full h-full rounded-xl bg-red-500 opacity-40 shadow-sm" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs text-white bg-black/50 backdrop-blur-sm rounded-xl font-medium">
              <AiFillLock className="text-white animate-lockPulse mr-1 sm:mr-2" />
              Premium
            </span>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="p-4 sm:p-6 rounded-2xl bg-(--bg-secondary) shadow-primary border border-border flex flex-col gap-4 sm:gap-5">
        <h2 className="text-lg sm:text-xl font-semibold text-(--text)">Preferences</h2>

        <div className="flex flex-col gap-3 sm:gap-4">
          <label className="flex justify-between items-center bg-(--bg) p-3 rounded-xl border border-border hover:bg-(--hover) transition">
            <span className="text-(--text-secondary) font-medium">Notifications</span>
            <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" />
          </label>

          <label className="flex justify-between items-center bg-(--bg) p-3 rounded-xl border border-border hover:bg-(--hover) transition">
            <span className="text-(--text-secondary) font-medium">Two-Factor Auth</span>
            <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" />
          </label>
        </div>
      </div>

      {/* Premium Status */}
      <div className="p-4 sm:p-6 rounded-2xl bg-(--bg-secondary) shadow-primary border border-border">
        <h2 className="text-lg sm:text-xl font-semibold text-(--text)">Premium Status</h2>

        <p className="text-(--text-secondary) mt-1">You are currently a free user.</p>

        <button className="mt-4 px-6 py-2.5 w-full sm:w-auto rounded-xl bg-primary text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}
