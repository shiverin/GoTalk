import React, { useState } from "react";

export default function PillButton({ text, onClick, bgcolor = "#E5EBEE", txtcolor="black"}) {
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

  }}
  className={`
    px-4 py-2
    m-1
    rounded-full
    text-sm font-medium
    shadow-sm
    focus:outline-none
    h-10
  `}
>
  {text}
</button>

  );
}