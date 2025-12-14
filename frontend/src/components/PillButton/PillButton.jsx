import React, { useState } from "react";

export default function PillButton({
  height = 40,
  children,
  onClick,
  bgcolor = "#E5EBEE",
  txtcolor = "black",
  textSize = 14,
  px = 14, // default horizontal padding in px
}) {
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
        backgroundColor: bgcolor,
        color: txtcolor,
        filter: getFilter(),
        height: `${height}px`,
        fontSize: `${textSize}px`,
        paddingLeft: `${px}px`,
        paddingRight: `${px}px`,
      }}
      className="
        rounded-full
        font-medium
        focus:outline-none
        inline-flex
        items-center
      "
    >
      {children}
    </button>
  );
}
