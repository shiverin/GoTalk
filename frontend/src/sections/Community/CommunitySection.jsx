import React from "react";
import { getRandomColor } from "../../utils/color";
import { useParams } from "react-router-dom";

export default function CommunitySection() {
  const { name } = useParams();

  const bannerColor = getRandomColor();

  return (
    <div className="pt-0">
      {/* Banner */}
      <div
        className="w-full h-28"
        style={{ backgroundColor: bannerColor }}
      ></div>

      {/* Community Header */}
      <div className="bg-white border-b shadow px-6 py-10 relative">
        {/* Icon circle overlapping banner */}
        <div
          className="w-20 h-20 rounded-full border-4 border-white absolute -top-10"
          style={{ backgroundColor: bannerColor }}
        ></div>

        <div className="ml-24 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">c/{name}</h1>
            <p className="text-gray-600 text-sm">128,493 members · 312 online</p>
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
          {/* Example Post (replace with real posts) */}
          <div className="bg-white border rounded-md p-4 shadow-sm mb-4 hover:border-gray-400">
            <h2 className="font-semibold text-lg">Welcome to c/{name}!</h2>
            <p className="text-gray-700 mt-2">
              This is a placeholder post. Replace with API data.
            </p>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-72">
          <div className="bg-white border rounded-md p-4 shadow-sm">
            <h3 className="font-semibold mb-2">About Community</h3>
            <p className="text-gray-700 text-sm">
              Replace this with your backend "description" field.
            </p>

            <div className="mt-4 text-sm text-gray-600">
              Created Jan 7, 2024
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
