import React from "react";

export default function PostTypeTabs({ selected, onSelect }) {
  const types = ["text", "link"];
  return (
    <div className="flex gap-2 mt-4">
      {types.map(type => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`px-3 py-1 rounded ${
            selected === type ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}
