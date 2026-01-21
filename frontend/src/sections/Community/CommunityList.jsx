import React from "react";
import { Link } from "react-router-dom";
import JoinButton from "../../components/JoinButton/JoinButton";
import { getRandomColor } from "../../utils/color";

export default function CommunityList({ communities = [] }) {
  return (
    <div className="pt-3 px-20">
      <h1 className="text-[32px] font-bold mb-16 pb-4">Explore Communities</h1>
      <hr className="border-gray-300 mb-4" />
      <div className="mt-7 mb-2 text-lg font-semibold">Recommended for you</div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {communities.map((c) => {
          const banner = getRandomColor();

          return (
            <div
              key={c.id}
              className="flex flex-col bg-white rounded-xl border p-4 hover:bg-gray-50 transition h-[100px]"
            >
              {/* Top row: Icon + name/stats + Join button */}
              <div className="flex justify-between mb-0">
                <div className="flex gap-3 items-start">
                  {/* Circle Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: banner }}
                  ></div>

                  {/* Name + Members */}
                  <div className="flex flex-col">
                    <Link
                      to={`/communities/${c.id}`}
                      className="font-semibold hover:underline"
                    >
                      c/{c.name}
                    </Link>
                    <div className="text-sm text-gray-500">
                      {c.members?.toLocaleString()} members
                    </div>
                  </div>
                </div>
                <div className="h-4">
                {/* Join Button */}
                <JoinButton communityId={c.id} />
                </div>
              </div>

              {/* Description (fills remaining space, truncated) */}
              {c.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-3 overflow-hidden">
                  {c.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
