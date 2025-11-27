import { useSelector } from "react-redux";
import type { AppState } from "../../redux/store";

const Home = () => {
  const user = useSelector(({ user }: AppState) => user);

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)] p-4 pt-20">
      {/* Greeting Section */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          Welcome back, {user ? user.name : "Warrior"}! ⚔️
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">Ready to conquer today's tasks?</p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Card */}
        <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] shadow-primary">
          <h2 className="text-lg font-semibold text-[var(--text)]">Today's Tasks</h2>
          <p className="text-3xl font-bold text-[var(--primary)] mt-2">12</p>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Keep the streak alive!</p>
        </div>

        <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] shadow-primary">
          <h2 className="text-lg font-semibold text-[var(--text)]">Completed</h2>
          <p className="text-3xl font-bold text-[var(--primary)] mt-2">7</p>
          <p className="text-[var(--text-secondary)] text-sm mt-1">You're levelling up!</p>
        </div>

        <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] shadow-primary">
          <h2 className="text-lg font-semibold text-[var(--text)]">Pending</h2>
          <p className="text-3xl font-bold text-[var(--primary)] mt-2">5</p>
          <p className="text-[var(--text-secondary)] text-sm mt-1">You can finish them!</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 shadow-primary">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text)]">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-md shadow-primary hover:opacity-90 transition">
            Add New Task
          </button>

          <button className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text)] border border-[var(--border)] rounded-md hover:bg-[var(--bg)] transition">
            View All Tasks
          </button>

          <button className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text)] border border-[var(--border)] rounded-md hover:bg-[var(--bg)] transition">
            Generate Insights
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
