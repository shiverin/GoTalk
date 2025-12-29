import React from "react";

export default function CommunitySelector({
  communities = [],
  selected = "",
  onSelect = () => {},
}) {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold">Select a community</label>

      <select
        className="w-full border rounded p-2 mt-1 bg-white"
        value={selected}
        onChange={(e) => {
          const value = e.target.value;
          console.log("Selected community:", value); // debug output
          onSelect(value);
        }}
      >
        <option value="">Choose a community…</option>

        {communities.map((c) => (
          <option key={c.id} value={c.name}>
            c/{c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
