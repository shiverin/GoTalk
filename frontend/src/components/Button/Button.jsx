import React from "react";

export default function Button({ text, color = "blue", onClick }) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <button
      className={`px-6 py-3 rounded transition ${colors[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
