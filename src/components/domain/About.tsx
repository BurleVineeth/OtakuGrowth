import ErwinSmithCard from "../ui/ErwinSmithCard";
import GokuCard from "../ui/GokuCard";
import IsagiCard from "../ui/IsagiCard";
import LuffyCard from "../ui/LuffyCard";

const About = () => {
  return (
    <>
      <ErwinSmithCard />
      <IsagiCard />
      <LuffyCard />
      <GokuCard />

      <div className="w-full max-w-4xl mx-auto px-6 py-16 text-(--text) leading-relaxed">
        {/* TITLE */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-4">
            Unleash Your Inner Protagonist
          </h1>
          <p className="text-(--text-secondary) text-lg max-w-2xl mx-auto">
            Every journey begins with a spark — the moment you choose to rise, grow, and rewrite
            your story. This platform exists to awaken that spark and guide you through your
            personal transformation arc.
          </p>
        </header>

        {/* WHY WE EXIST */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-primary mb-4">Why We Exist</h2>

          <p className="text-(--text-secondary) mb-4">
            Most people move through life without direction. Goals fade. Motivation slips. Dreams
            get buried under routine. We built this platform to give you the tools and energy to
            take back control of your story by helping you:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-(--text-secondary)">
            <li>Track your journey with clarity and purpose</li>
            <li>Build discipline through meaningful daily actions</li>
            <li>Stay inspired by the mindset of iconic anime heroes</li>
            <li>Set missions, break limits, and grow consistently</li>
          </ul>

          <p className="text-(--text) font-semibold mt-4">
            This isn’t just an app — this is your <span className="text-primary">training arc</span>
            .
          </p>
        </section>

        {/* CORE BELIEF */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Core Belief</h2>

          <p className="text-(--text-secondary) mb-6">
            Every person carries a hidden protagonist — someone capable of excellence, resilience,
            and transformation. But greatness doesn’t appear overnight. It is shaped through
            discipline and built through daily effort.
          </p>

          <blockquote className="border-l-4 border-primary pl-4 italic text-(--text-secondary)">
            <p>
              Progress is power.
              <br />
              Consistency is evolution.
              <br />
              Your journey deserves intention.
            </p>
          </blockquote>
        </section>

        {/* FEATURES */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-primary mb-6">What You’ll Experience</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-bold text-primary mb-1">⚔️ Hero-Style Goal Setting</h3>
              <p className="text-(--text-secondary)">
                Turn your ambitions into missions and quests. Your goals become challenges to
                conquer, just like an anime protagonist preparing for their biggest arc.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-1">🔥 Anime-Fueled Motivation</h3>
              <p className="text-(--text-secondary)">
                Draw strength from philosophies inspired by legends like Goku, Isagi, Asta, and
                Luffy — the mindset that turns struggle into growth.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-1">
                📈 Growth & Level-Up Dashboard
              </h3>
              <p className="text-(--text-secondary)">
                Visualize your progress, track your consistency, and watch your stats evolve like
                your own character level-up screen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-1">💫 Story-Driven Experience</h3>
              <p className="text-(--text-secondary)">
                Every feature is crafted to make you feel like you're inside your own anime world —
                fully immersed in growth, challenge, and transformation.
              </p>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Vision</h2>

          <p className="text-(--text-secondary) mb-4">
            We strive to create a world where personal growth feels exciting, discipline feels
            heroic, and improvement feels like an anime transformation rather than a chore.
          </p>

          <p className="text-(--text-secondary)">
            A world where:
            <br />— You don’t just set goals.
            <br />— You don’t just endure challenges.
            <br />
            <span className="font-bold text-primary">— You rise above them.</span>
          </p>
        </section>

        {/* FINAL MESSAGE */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-primary mb-4">Your Journey Starts Now</h2>

          <p className="text-(--text-secondary) mb-3 max-w-xl mx-auto">
            This is the opening chapter of your evolution. The world won't wait. Your future self
            won’t wait.
          </p>

          <p className="text-(--text-secondary) mb-8 max-w-xl mx-auto">
            Step forward. Begin your story. And remember:
          </p>

          <blockquote className="border-l-4 border-primary pl-4 italic text-(--text-secondary) inline-block text-left mb-10">
            <p>
              Heroes aren’t born.
              <br />
              They are forged — through effort, discipline, and unbreakable will.
            </p>
          </blockquote>

          <p className="font-bold text-primary text-xl">
            Welcome to your story.
            <br />
            Welcome to your legend.
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
