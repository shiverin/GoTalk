import React from "react";
import { getRandomColor } from "../../utils/color";
import { Link } from "react-router-dom";

export default function CommunityList({ communities = [] }) {

  return (
    <div className="pt-20 max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Discover Communities</h1>

      <div className="bg-white rounded-md shadow border">
        {communities.map((c, index) => {
          const banner = getRandomColor();

          return (
            <Link
              to={`/c/${c.name}`}
              key={c.id}
              className="flex items-center p-4 border-b last:border-none hover:bg-gray-50 transition"
            >
              {/* Circle icon */}
              <div
                className="w-12 h-12 rounded-full flex-shrink-0"
                style={{ backgroundColor: banner }}
              ></div>

              {/* Text */}
              <div className="ml-4 flex-1">
                <div className="font-semibold">c/{c.name}</div>
                <div className="text-sm text-gray-600">
                  {c.members} members
                </div>
              </div>

              {/* Join button */}
              <button className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700">
                Join
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
