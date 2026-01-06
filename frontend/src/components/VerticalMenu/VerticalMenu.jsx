import React from "react";

export default function VerticalMenu({ items, selectedItem, onSelect }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="list-none mt-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (item.onClick) item.onClick();

              if (!item.noSelect && onSelect) onSelect(item);
            }}
            className={`flex items-center gap-[13px] px-[23px] py-[10px] text-sm font-medium rounded-lg ${
              selectedItem === item.id
                ? "bg-[#E5EBEE] text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
