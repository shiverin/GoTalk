import React from "react";

export default function VerticalMenu({ items, onSelect }) {
  return (
    <nav className="flex flex-col w-[255px] bg-white p-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className="bg-white text-left px-4 py-2 mb-2 rounded hover:bg-gray-200 transition-colors"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
