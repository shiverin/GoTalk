import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function AbsoluteDropdown({ trigger, children, align = "screen-right" }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      // Ignore clicks on trigger itself
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        !document.getElementById("dropdown-menu")?.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menu element
  const menu = open && createPortal(
    <div
      id="dropdown-menu"
      className={`
        fixed top-14 min-w-[200px] bg-white border rounded-xl shadow-lg py-2 z-50
        ${align === "screen-right" ? "right-0" : "left-0"}
      `}
    >
      {children}
    </div>,
    document.body
  );

  return (
    <div className="inline-block" ref={triggerRef}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {menu}
    </div>
  );
}
