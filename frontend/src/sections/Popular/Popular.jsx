import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import Community from "../../components/Community/Community.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";

const randomMembers = () => Math.floor(Math.random() * 5_000_000) + 1_000;
const randomIconUrl = (seed) => `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;

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
  id: name.replace(/[^a-z0-9]/gi, ""), // simple ID for route
  name,
  members: randomMembers(),
  iconUrl: randomIconUrl(name),
}));

export default function Popular() {
  const [communities, setCommunities] = useState(defaultCommunities);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();  // <--- Add this

  useEffect(() => {
    fetch("http://localhost:8080/api/communities/top/20")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Map API data to include ID
          const mapped = data.slice(0, 20).map((c, i) => ({
            id: c.id ?? i, // fallback if no id
            name: c.name,
            members: c.members ?? randomMembers(),
            iconUrl: c.iconUrl ?? randomIconUrl(i),
          }));
          setCommunities(mapped);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch top communities, using default:", err);
        setCommunities(defaultCommunities);
      });
  }, []);

  const displayedCommunities = showAll ? communities : communities.slice(0, 5);

  return (
    <div
      className={`sticky top-[8vh] rounded-md flex flex-col justify-between overflow-y-auto transition-all duration-300 h-[654px]`}
    >
      <div className="mt-4 pt-2 px-4 bg-gray-50 rounded-md pb-5"
           style={{ height: showAll ? "" : "380px" }}>
        <h2 className="text-gray-500 font-semibold text-xs mb-8 uppercase ">
          Popular Communities
        </h2>
        <div className="px-0">
          {displayedCommunities.map((c) => (
            <Community
              key={c.id}
              icon={<img src={c.iconUrl} alt={c.name} className="w-7 h-7 rounded-full" />}
              name={c.name}
              members={c.members}
              onClick={() => navigate(`/communities/${c.id}`)} // <--- navigate on click
              className="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1"
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
        <div className="flex flex-wrap gap-2">
          <span className="hover:underline cursor-pointer">goTalk Rules</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">User Agreement</span>
        </div>
        <div className="mt-1 hover:underline cursor-pointer">Accessibility</div>
        <div className="mt-1">
          goTalk © 2025. All rights reserved by Shizhen Zhao.
        </div>
      </div>
    </div>
  );
}
