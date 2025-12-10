import { StaticImageUrls } from "../../constants";
import CharacterCard from "./CharacterCard";

export default function IsagiCard() {
  return (
    <CharacterCard img={StaticImageUrls.ISAGE} reverse>
      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “Ego isn’t about being the best. It’s about refusing to stay the same.”
      </p>

      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “If you can’t change someone… then change yourself. Break your patterns, rewrite your
        instincts, and force the world to respond to the new you.”
      </p>

      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “I will destroy myself as many times as it takes. Every version I kill becomes the
        foundation for the version that surpasses them all.”
      </p>

      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “Growth isn’t pretty. It’s violent. It’s sacrificing who you are for who you want to
        become.”
      </p>

      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “When the world doesn’t give you what you want, devour the world and take it anyway.”
      </p>

      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “Reinvent. Rebuild. Reclaim. If the path doesn’t exist, carve a new one with your
        willpower.”
      </p>

      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “If doubt surrounds you, let it fuel you. If fear approaches, chase it. That’s how ego
        evolves.”
      </p>

      <p className="italic text-(--text-secondary) text-m leading-relaxed">
        “Just one clear moment of resolve can rewrite your entire future.”
      </p>
    </CharacterCard>
  );
}
