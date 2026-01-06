import React, { useState, useEffect, useRef } from "react";
import PillButton from "../../components/PillButton/PillButton";
import { ChevronDown } from "lucide-react";

export default function CommunitySelector({ communities, selected, onSelect, disabled = false }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedName =
    communities.find((c) => c.id === selected)?.name || "Select a community";

  // --- CLICK OUTSIDE HANDLER ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block my-0">
      {/* Trigger PillButton */}
      <PillButton
        height={38}
        bgcolor={disabled ? "#F0F0F0" : "#E5EBEE"} // lighter gray if disabled
        txtcolor={disabled ? "#999" : "#333"} // gray text if disabled
        px={14}
        textSize={14}
        isOpen={open}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className="w-full justify-between cursor-pointer"
      >
        <span>{selectedName}</span>
        <span className="ml-2">
          <ChevronDown size={16} />
        </span>
      </PillButton>

      {/* Dropdown */}
      {open && !disabled && (
        <div className="absolute z-20 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {communities
            .filter((c) => c && c.id != null && c.name)
            .map((c) => (
              <button
                key={c.id}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  onSelect(c.id);
                  setOpen(false);
                }}
              >
                {c.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
