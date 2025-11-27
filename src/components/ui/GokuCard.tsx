import CharacterCard from "./CharacterCard";

export default function GokuCard() {
  return (
    <CharacterCard
      img="https://wallpapers.com/images/hd/goku-black-1920-x-1080-background-oi481forocvatchl.jpg"
      reverse
    >
      <p className="italic text-[var(--text-secondary)] text-m leading-relaxed">
        “If the world tells you to stop, laugh and keep walking. Your dream belongs to you, not to
        them.”
      </p>

      <p className="italic text-[var(--text-secondary)] text-m leading-relaxed">
        “When someone tries to break your spirit, that’s when you hold your hat tighter and push
        forward. Kings are crowned by their resolve.”
      </p>

      <p className="italic text-[var(--text-secondary)] text-m leading-relaxed">
        “I don’t need guarantees. I just need the will to keep moving, no matter how impossible the
        sea looks today.”
      </p>

      <p className="italic text-[var(--text-secondary)] text-m leading-relaxed">
        “If you fall, get up. If you’re beaten, smile. If your path disappears, make a new one with
        your fists. That’s freedom.”
      </p>

      <p className="italic text-[var(--text-secondary)] text-m leading-relaxed">
        “A dream that doesn’t scare you isn’t big enough for your heart.”
      </p>
    </CharacterCard>
  );
}
