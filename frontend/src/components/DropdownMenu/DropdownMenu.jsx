import { useEffect, useRef, useState } from "react";

export default function Dropdown({ trigger, children, align = "left" }) {
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

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger */}
      <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      <div
        className={`
          absolute mt-2 min-w-[180px] bg-white rounded-xl shadow-lg border py-2 z-50
          transform origin-top-right
          transition-all duration-200 ease-out
          ${align === "right" ? "right-0" : "left-0"}
          ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-1 pointer-events-none"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
