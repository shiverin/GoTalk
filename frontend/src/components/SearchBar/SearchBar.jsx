import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // optional icon

export default function SearchBar({ placeholder = "Find anything", onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const isActive = isFocused || query.length > 0;

  return (
<div className="w-full relative flex items-center">
  <div className="w-full max-w-6xl mx-auto flex justify-start">
    <form
      onSubmit={handleSubmit}
      style={{ width: "49.6%" }}
      className={`
        flex items-center
        rounded-full
        border
        transition-colors duration-150
        ${isFocused ? "border-[#B4D7FE] ring-[0.5px] ring-white/50 bg-white" : "border ring-1 ring-[#FF4500] bg-white"}
        hover:bg-gray-100
        overflow-hidden
        px-1
        ml-[32%]  /* shifts form to ~3/5 horizontally */
        max-[640px]:ml-4  /* on small screens, shift less to avoid overflow */
      `}
    >
      {/* Left icon */}
      <div className="flex items-center px-3 text-gray-400">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          text-sm
          flex-1
          py-2
          outline-none
          bg-transparent
          placeholder-gray-500
          ${isActive ? "text-left placeholder:text-left" : "text-center placeholder:text-center"}
        `}
      />

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Button */}
      <button
        type="submit"
        className={`
          px-4
          py-1
          rounded-full
          bg-[#FF4500]
          text-white
          font-semibold
          hover:bg-[#e03d00]
          active:bg-[#c53600]
          transition-colors duration-150
        `}
      >
        Ask
      </button>
    </form>
  </div>
</div>


  );
}
