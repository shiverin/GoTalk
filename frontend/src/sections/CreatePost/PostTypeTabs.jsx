import React from "react";

export default function PostTypeTabs({ selected, onSelect }) {
  const types = ["text", "link"];

  return (
    <div className="flex gap-3 mt-4">
      {types.map((type) => {
        const isActive = selected === type;

        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`
              relative px-3 py-1 rounded font-medium transition-all 
              bg-white text-gray-700 
              hover:brightness-90 active:brightness-75
            `}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}

            {/* SHORT BLUE UNDERLINE (inside the button bottom) */}
            {isActive && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 
                               w-6 h-[3px] rounded bg-[#0B449B]"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
