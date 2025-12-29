import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  trigger,
  children,
  align = "left", // 'left', 'right', 'screen-left', 'screen-right'
  menuClassName = "", // optional extra classes
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute alignment classes
  let alignmentClasses = "";
  switch (align) {
    case "right":
      alignmentClasses = "right-0 left-auto";
      break;
    default:
      alignmentClasses = "left-0";
  }

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger */}
      <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        {typeof trigger === "function" ? trigger(open) : trigger}
      </div>

      {/* Menu */}
      <div
        className={`
          absolute mt-2 min-w-[180px] bg-white rounded-xl shadow-lg border py-2 z-50
          transform origin-top-right
          transition-all duration-200 ease-out
          ${alignmentClasses}
          ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-1 pointer-events-none"}
          ${menuClassName}
        `}
      >
        {children}
      </div>
    </div>
  );
}
