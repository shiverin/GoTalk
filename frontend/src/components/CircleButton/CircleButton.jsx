import React, { useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function CircleButton({
  Icon = EllipsisHorizontalIcon,
  onClick,
  size = 10,
}) {
  const dimension = `${size * 0.25}rem`;
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const getFilter = () => {
    if (active) return "brightness(80%)";
    if (hovered) return "brightness(90%)";
    return "brightness(100%)";
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        width: dimension,
        height: dimension,
        filter: getFilter(),
      }}
      className="
        flex items-center justify-center
        rounded-full
        transition-all duration-100
        shadow-sm
        outline-none
        text-gray-700
      "
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}