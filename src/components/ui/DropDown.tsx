import React, { useState, useRef, useEffect } from "react";

export default function Dropdown({
  trigger,
  children,
  animateAction,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  animateAction?: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const enhanceChild = (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return child;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = child as React.ReactElement<any>;
    return React.cloneElement(el, {
      onClick: (e: React.MouseEvent) => {
        el.props.onClick?.(e);
        setOpen(false);
        if (animateAction) {
          animateAction(false);
        }
      },
    });
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (animateAction) {
          animateAction(false);
        }
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const triggerClick = () => {
    setOpen(!open);
    if (animateAction) {
      animateAction(!open);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <div onClick={triggerClick} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 p-2 bg-[var(--bg-secondary)] dark:bg-gray-900 shadow-xl rounded-xl w-48 z-50 border border-[var(--border)]">
          {React.Children.map(children, enhanceChild)}
        </div>
      )}
    </div>
  );
}
