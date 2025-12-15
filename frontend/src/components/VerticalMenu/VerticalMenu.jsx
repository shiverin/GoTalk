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
              onSelect(item);  
            }}  
            // Dynamically apply classes for the selected state  
            className={`flex items-center gap-[13px] px-[23px] py-[10px] text-sm font-medium rounded-lg ${  
              selectedItem === item.id  
                ? "bg-[#E5EBEE] text-gray-900" // Active styles  
                : "text-gray-700 hover:bg-gray-100" // Default styles  
            }`}  
          >  
            {/* Render the icon passed from the parent */}  
            <span className="w-5 h-5">{item.icon}</span>  
            <span>{item.label}</span>  
          </a>  
        </li>  
      ))}  
    </ul>  
  );  
}