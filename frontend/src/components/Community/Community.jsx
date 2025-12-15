import React from "react";

export default function Community({ icon, name, members }) {
  return (
    <div className="flex items-center gap-3 px-4 py-[9px] hover:bg-gray-200 rounded cursor-pointer">
      {/* Icon */}
      <div className="w-7 h-7 flex items-center justify-center">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-gray-500">
          {members.toLocaleString()} members
        </span>
      </div>
    </div>
  );
}
