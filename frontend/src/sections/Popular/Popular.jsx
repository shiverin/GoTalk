import React, { useEffect, useState } from "react";

const defaultCommunities = [
  { name: "r/politics" },
  { name: "r/technology" },
  { name: "r/movies" },
  { name: "r/music" },
  { name: "r/science" },
  { name: "r/books" },
  { name: "r/gaming" },
  { name: "r/sports" },
  { name: "r/programming" },
  { name: "r/art" },
  { name: "r/history" },
  { name: "r/space" },
  { name: "r/travel" },
  { name: "r/fitness" },
  { name: "r/food" },
  { name: "r/DIY" },
  { name: "r/photography" },
  { name: "r/animals" },
  { name: "r/fashion" },
  { name: "r/education" },
];

export default function Popular() {
  const [communities, setCommunities] = useState(defaultCommunities);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/communities/top20")
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
      className={`pt-2 sticky top-[8vh] rounded-md flex flex-col justify-between overflow-y-auto transition-all duration-300 h-[32%]`}
    >
      <div className=" pt-2 px-4 bg-gray-50"
        style={{ height: showAll ? "120vh" : "380px" }} // dynamic height
      >
      <h2 className=" text-gray-500 font-semibold text-xs mb-2 uppercase ">
        Popular Communities
      </h2>
      {displayedCommunities.map((c, i) => (
        <div
          key={i}
          className="py-1 px-2 hover:bg-gray-200 rounded cursor-pointer"
        >
          {c.name}
        </div>
      ))}
      {communities.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-black text-sm hover:underline self-start"
        >
          {showAll ? "See less" : "See more"}
        </button>
      )}
      </div>
        <div>
            <div className="flex flex-col gap-1 text-gray-500 text-xs mt-8 pl-[16.7px] pb-[12.6px]">
                {/* First line */}
                <div className="flex flex-wrap gap-2">
                    <span className="hover:underline cursor-pointer">GoTalk Rules</span>
                    <span className="hover:underline cursor-pointer">Privacy Policy</span>
                    <span className="hover:underline cursor-pointer">User Agreement</span>
                </div>

                {/* Second line */}
                <div className="mt-1 hover:underline cursor-pointer">
                    Accessibility
                </div>

                {/* Third line */}
                <div className="mt-1">
                    GoTalk © 2025. All rights reserved by Shizhen Zhao.
            </div>
        </div>
      </div>
    </div>  
  );
}
