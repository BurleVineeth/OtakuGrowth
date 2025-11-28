interface Props {
  img: string;
  center?: boolean;
  reverse?: boolean;
  children: React.ReactNode;
}

export default function CharacterCard({ img, reverse = false, center = false, children }: Props) {
  return (
    <div className="w-full p-4">
      <div
        className={`rounded-2xl shadow-lg overflow-hidden
                    flex flex-col md:items-center gap-6
                    ${center ? "" : reverse ? "md:flex-row" : "md:flex-row-reverse"}`}
      >
        {/* Image */}
        <img
          src={img}
          alt="Character"
          className={`w-full h-64 ${center ? "object-contain" : "object-contain md:w-1/3"}`}
        />

        {/* Content from parent */}
        <div className={`flex flex-col gap-3 p-6 ${center ? "text-center" : "md:w-2/3"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
