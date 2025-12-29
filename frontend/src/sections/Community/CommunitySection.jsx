import React from "react";
import { getRandomColor } from "../../utils/color";

export default function CommunitySection({ community }) {
  // Use a stable seed, e.g., community id or name
  const seed = community?.id || community?.name || "default";
  const bannerColor = getRandomColor(seed);

  const name = community?.name || "unknown";
  const members = community?.membersCount || 0;
  const online = community?.onlineCount || 0;
  const description = community?.description || "No description available";
  const createdAt = community?.createdAt || "Unknown date";

  return (
    <div className="pt-0">
      {/* Banner */}
      <div
        className="w-full h-28"
        style={{ backgroundColor: bannerColor }}
      ></div>

      {/* Community Header */}
      <div className="bg-white border-b shadow px-6 py-10 relative">
        <div
          className="w-20 h-20 rounded-full border-4 border-white absolute -top-10"
          style={{ backgroundColor: bannerColor }}
        ></div>

        <div className="ml-24 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">g/{name}</h1>
            <p className="text-gray-600 text-sm">
              {members.toLocaleString()} members · {online} online
            </p>
          </div>

          <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
            Join
          </button>
        </div>
      </div>

      {/* Page Layout */}
      <div className="max-w-6xl mx-auto flex gap-6 mt-6 px-6">
        {/* Left: Posts */}
        <div className="flex-1">
          <div className="bg-white border rounded-md p-4 shadow-sm mb-4 hover:border-gray-400">
            <h2 className="font-semibold text-lg">Welcome to g/{name}!</h2>
            <p className="text-gray-700 mt-2">{description}</p>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-72">
          <div className="bg-white border rounded-md p-4 shadow-sm">
            <h3 className="font-semibold mb-2">About Community</h3>
            <p className="text-gray-700 text-sm">{description}</p>
            <div className="mt-4 text-sm text-gray-600">Created {createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
