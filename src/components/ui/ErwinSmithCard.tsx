import { StaticImageUrls } from "../../constants";
import CharacterCard from "./CharacterCard";

export default function ErwinSmithCard() {
  return (
    <CharacterCard img={StaticImageUrls.ERWIN_SMITH} center>
      {" "}
      <p className="italic text-(--text-secondary) text-lg leading-relaxed space-y-4">
        <span className="block">
          “Everything that you thought had meaning: every hope, dream, or moment of happiness… None
          of it matters as you lie bleeding out on the battlefield. None of it changes what a
          speeding rock does to a body — we all die.
        </span>

        <span className="block mt-3">
          But does that mean our lives are meaningless? Does that mean that there was no point in
          our being born?
        </span>

        <span className="block mt-3">
          Would you say that of our slain comrades? What about their lives? Were they
          meaningless?...{" "}
          <span className="not-italic font-semibold text-(--text)">They were not!</span>
        </span>

        <span className="block mt-3">
          Their memory serves as an example to us all — the courageous fallen, the anguished fallen!
          Their lives have meaning because we, the living, refuse to forget them!
        </span>

        <span className="block mt-3">
          And as we ride to certain death, we trust our successors to do the same for us!
        </span>

        <span className="block mt-3">
          Because my soldiers do not buckle or yield when faced with the cruelty of this world!
        </span>

        <span className="block mt-3 text-(--text) font-semibold">
          My soldiers push forward! My soldiers scream out! My soldiers{" "}
          <span className="text-primary">RAAAAAAGE!</span>
        </span>
      </p>
    </CharacterCard>
  );
}
