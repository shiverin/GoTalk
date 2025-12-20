import React, { useEffect, useState } from "react";
import Community from "../../components/Community/Community.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";

const randomMembers = () => {
  // 1k – 5M members
  return Math.floor(Math.random() * 5_000_000) + 1_000;
};

const randomIconUrl = () => {
  // simple placeholder icons (safe + lightweight)
  const id = Math.floor(Math.random() * 50) + 1;
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${id}`;
};

const defaultCommunities = [
  "r/politics",
  "r/technology",
  "r/movies",
  "r/music",
  "r/science",
  "r/books",
  "r/gaming",
  "r/sports",
  "r/programming",
  "r/art",
  "r/history",
  "r/space",
  "r/travel",
  "r/fitness",
  "r/food",
  "r/DIY",
  "r/photography",
  "r/animals",
  "r/fashion",
  "r/education",
].map((name) => ({
  name,
  members: randomMembers(),
  iconUrl: randomIconUrl(),
}));

export default function Popular() {
  const [communities, setCommunities] = useState(defaultCommunities);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/communities/top20")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCommunities(data.slice(0, 20)); // ensure only top 20
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch top communities, using default:", err);
        setCommunities(defaultCommunities); // fallback
      });
  }, []);

  const displayedCommunities = showAll ? communities : communities.slice(0, 5);
//380 px initally
  return (
    <div
      className={`sticky top-[8vh] rounded-md flex flex-col justify-between overflow-y-auto transition-all duration-300 h-[654px]`}
    >
      <div className="mt-4 pt-2 px-4 bg-gray-50 rounded-md pb-5"
        style={{ height: showAll ? "" : "380px" }} // dynamic height
      >
      <h2 className="text-gray-500 font-semibold text-xs mb-8 uppercase ">
        Popular Communities
      </h2>
        <div className="px-0">
            {displayedCommunities.map((c, i) => (
            <Community
                key={i}
                icon={
                <img
                    src={c.iconUrl}
                    alt={c.name}
                    className="w-7 h-7 rounded-full"
                />
                }
                name={c.name}
                members={c.members}
            />
            ))}
        {communities.length > 5 && (
            <PillButton
            onClick={() => setShowAll(!showAll)}
            bgcolor="#f9fafb"
            textSize={12}
            px={12}
            height={32}
            >
            {showAll ? "See less" : "See more"}
            </PillButton>
        )}
        </div>
      </div>
            <div className="flex flex-col gap-1 text-gray-500 text-xs mt-8 pl-[16.6px] pb-[13px]">
                {/* First line */}
                <div className="flex flex-wrap gap-2">
                    <span className="hover:underline cursor-pointer">goTalk Rules</span>
                    <span className="hover:underline cursor-pointer">Privacy Policy</span>
                    <span className="hover:underline cursor-pointer">User Agreement</span>
                </div>

                {/* Second line */}
                <div className="mt-1 hover:underline cursor-pointer">
                    Accessibility
                </div>

                {/* Third line */}
                <div className="mt-1">
                    goTalk © 2025. All rights reserved by Shizhen Zhao.
                </div>
          </div>
    </div>
  );
}
