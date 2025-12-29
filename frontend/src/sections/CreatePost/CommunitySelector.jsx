import React from "react";

export default function CommunitySelector({ communities, selected, onSelect }) {
  return (
    <div className="my-4">
      <select
        value={selected || ""}
        onChange={e => onSelect(Number(e.target.value))}
        className="border p-2 rounded w-full"
      >
        <option value="">Select a community</option>
        {communities
          .filter(c => c && c.id != null && c.name) // remove null/undefined entries
          .map(c => (
            <option key={c.id} value={c.id}>
              {c.name || "Unnamed Community"} {/* fallback just in case */}
            </option>
          ))}
      </select>
    </div>
  );
}
