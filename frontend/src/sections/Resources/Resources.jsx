import React from "react";  
// Using an icon for the caret  
import { ChevronDown } from 'lucide-react';  
  
export default function ResourcesSection({ items }) {  
  return (  
    <details className="group">  
      {/* Section Header */}  
      <summary className="flex items-center justify-between gap-3 px-4 py-[10px] text-[#577076] hover:bg-gray-100 hover:text-gray-700 rounded-lg cursor-pointer">  
        <span className="text-[13px] font-normal ">RESOURCES</span>  
          
        {/* Caret Icon with rotation on open */}  
        <span className="shrink-0 transition duration-300 group-open:-rotate-180">  
            <ChevronDown size={20} />  
        </span>  
      </summary>  
  
      {/* Expanded Content */}  
      <ul className="mt-2 space-y-1 px-4">  
        {items.map((item, index) => (  
          <li key={index}>  
            <a  
              href={item.href}  
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"  
            >  
              {item.label}  
            </a>  
          </li>  
        ))}  
      </ul>  
    </details>  
  );  
}