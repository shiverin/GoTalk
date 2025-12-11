import React from "react";

export default function VerticalMenu({ items, onSelect }) {
  return (
    <nav className="flex flex-col w-64 bg-gray-100 min-h-screen p-4 shadow">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className="text-left px-4 py-2 mb-2 rounded hover:bg-gray-200 transition-colors"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
