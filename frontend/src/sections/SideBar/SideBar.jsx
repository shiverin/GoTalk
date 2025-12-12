import React, { useState } from "react";
import VerticalMenu from "../../components/VerticalMenu/VerticalMenu.jsx";

export default function SideBar() {
  const [selected, setSelected] = useState(null);

  const menuItems = [
    { label: "Home" },
    { label: "Popular" },
    { label: "Explore"},
    { label: "Logout" },
  ];

  return (
    <div className="flex">
      <VerticalMenu items={menuItems} onSelect={(item) => setSelected(item.label)} />
    </div>
  );
}
