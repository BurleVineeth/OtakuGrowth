import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../redux/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "../ui/Loader";
import { apiService } from "@/services/api.service";
import { BackendRoutes, UIRoutes } from "@/constants";
import { presentToast, setSkills, TOAST_TYPES } from "@/redux/features";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector(({ user }: AppState) => user);
  const skills = useSelector(({ skills }: AppState) => skills.skills);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const getSkills = async () => {
      try {
        setLoading(true);
        const { data: skillsList } = await apiService.get(
          `${BackendRoutes.GET_SKILLS}/${user._id}`
        );
        dispatch(setSkills(skillsList.data.skills));
      } catch (error) {
        dispatch(
          presentToast({
            message: apiService.getErrorMessage(error as Error),
            type: TOAST_TYPES.ERROR,
          })
        );
      } finally {
        setLoading(false);
      }
    };

    getSkills();
  }, [user]);

  const addSkill = () => {
    navigate(`/${UIRoutes.ADD_SKILL}`);
  };

  if (!user) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 pt-8 select-none">
      <section className="mb-14 animate-[fadeIn_0.5s_ease-out]">
        <h1
          className="
            text-4xl sm:text-5xl font-extrabold leading-tight 
            tracking-tight drop-shadow-[0_0_10px_var(--primary-transparent)]
          "
        >
          Welcome back, {user.name}
        </h1>

        <p className="text-[var(--text-secondary)] opacity-90 animate-[slideUp_0.6s_ease-out]">
          Grind hard. Master your skills. Become undeniable.
        </p>
      </section>

      <section
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-[fadeIn_0.6s_ease-out]
        "
      >
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="
                    rounded-xl border border-[var(--border)] 
                    bg-[var(--card-bg)] overflow-hidden shadow-lg
                  "
                >
                  <Skeleton height={180} />
                  <div className="p-5">
                    <Skeleton width="70%" height={26} />
                    <Skeleton width="50%" height={20} className="mt-2" />
                    <Skeleton count={3} className="mt-4" />
                  </div>
                </div>
              ))
          : skills.map((skill, index) => (
              <div
                key={skill._id}
                onClick={() => navigate(`/${UIRoutes.SKILL}/${skill._id}`)}
                className="
                  group rounded-xl border border-[var(--border)] 
                  bg-[var(--card-bg)] overflow-hidden shadow-lg 
                  transition-all duration-300 hover:shadow-[0_0_20px_var(--primary-transparent)]
                  animate-[slideUp_0.5s_ease-out] cursor-pointer hover:border-[var(--primary)]
                "
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* IMAGE ONLY ZOOMS */}
                <div className="h-48 overflow-hidden relative">
                  <div
                    className="
                      w-full h-full bg-cover bg-center 
                      transition-transform duration-500 
                      group-hover:scale-110
                    "
                    style={{ backgroundImage: `url(${skill.url})` }}
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h2
                    className="
                      text-2xl font-bold tracking-wide mb-1
                      drop-shadow-[0_0_6px_var(--primary-transparent)] capitalize
                    "
                  >
                    {skill.name}
                  </h2>

                  <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                    {skill.category}
                  </p>

                  <p className="mt-2 text-sm font-bold text-[var(--primary)] uppercase tracking-wide">
                    {skill.difficulty}
                  </p>

                  <p className="mt-3 text-[var(--text-secondary)] text-sm line-clamp-3 leading-relaxed capitalize">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
      </section>

      <button
        onClick={addSkill}
        className="fixed bottom-10 right-10 z-50 px-6 py-4 rounded-xl bg-[var(--primary)] text-[var(--button-text)] font-semibold shadow-[0_0_20px_var(--primary-transparent)] active:scale-95 transition-all animate-[popIn_0.4s_ease-out] text-sm cursor-pointer hover:bg-[var(--accent)]"
      >
        + Add Skill
      </button>
    </div>
  );
};

export default React.memo(Home);
