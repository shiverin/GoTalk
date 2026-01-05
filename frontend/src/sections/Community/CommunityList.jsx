import React from "react";
import { Link } from "react-router-dom";
import JoinButton from "../../components/JoinButton/JoinButton";
import { getRandomColor } from "../../utils/color";

export default function CommunityList({ communities = [] }) {
  return (
    <div className="pt-20 max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Discover Communities</h1>

      <div className="bg-white rounded-md shadow border">
        {communities.map((c) => {
          const banner = getRandomColor();

          return (
            <div
              key={c.id}
              className="flex items-center p-4 border-b last:border-none hover:bg-gray-50 transition"
            >
              {/* Circle Icon */}
              <div
                className="w-12 h-12 rounded-full flex-shrink-0"
                style={{ backgroundColor: banner }}
              ></div>

              {/* Name + Description + Stats */}
              <div className="ml-4 flex-1">
                <Link
                  to={`/communities/${c.id}`}
                  className="font-semibold hover:underline"
                >
                  c/{c.name}
                </Link>

                <div className="text-sm text-gray-500">
                  {c.members?.toLocaleString()} members
                </div>

                {c.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {c.description}
                  </p>
                )}
              </div>

              {/* Join Button */}
              <JoinButton communityId={c.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
