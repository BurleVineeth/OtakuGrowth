import { useRef, useState } from "react";

export default function DescriptionText({ text }: { text: string }) {
  const textRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const handleCollapse = () => {
    setExpanded(false);
    // reset scroll to top
    if (textRef.current) {
      textRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="relative">
      <div
        ref={textRef}
        className={`
          opacity-70 mt-1 text-sm md:text-base leading-relaxed break-words whitespace-normal pr-2
          transition-all duration-300 max-h-[4.5rem]
          ${expanded ? "!max-h-[5.5rem] overflow-y-auto" : " overflow-hidden"} 
        `}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : 3,
        }}
      >
        {text}
      </div>

      {!expanded && (
        <div
          className="text-[var(--primary)] text-sm cursor-pointer mt-1"
          onClick={() => setExpanded(true)}
        >
          Show more
        </div>
      )}

      {expanded && (
        <div className="text-[var(--primary)] text-sm cursor-pointer mt-1" onClick={handleCollapse}>
          Show less
        </div>
      )}
    </div>
  );
}
