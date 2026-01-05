import React, { useState } from "react";
import Posts from "../Posts/Posts.jsx";
import Popular from "../Popular/Popular.jsx";
import PostSortDropdown from "../PostSection/PostSortDropdown.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import { FiTable } from "react-icons/fi";

export default function Content({ posts, loading, error }) {
  const [sort, setSort] = useState("Best");

  // Sort posts on the frontend based on the selected option
  const sortedPosts = [...posts].sort((a, b) => {
    if (sort === "Top") {
      return b.post.Score - a.post.Score; // Sort by upvotes
    } else if (sort === "New") {
      return new Date(b.post.CreatedAt) - new Date(a.post.CreatedAt); // Sort by newest
    }
    return 0; // Best: keep API order or implement your own logic
  });

  return (
    <div className="flex mt-0 justify-between">
      {/* Left column: 70% */}
      <div className="mt-2 w-[70%] rounded-md pr-[20px]">
        <div>
          {/* Sort Dropdown */}
          <div className="pb-2 flex gap-2">
            <PostSortDropdown selected={sort} onSelect={setSort} /> 
            <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10"> Everywhere <span className="inline-flex ml-1"> <svg fill="currentColor" height="16" width="16" viewBox="0 0 20 20"> <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z" /> </svg> </span> </PillButton> <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10"> <FiTable className="w-4 h-4" /> </PillButton>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="p-4 text-gray-500">{error || "Loading posts..."}</div>
          ) : (
            <Posts posts={sortedPosts} />
          )}
        </div>
      </div>

      {/* Right column: 30% */}
      <div className="w-[29.5%]">
        <Popular />
      </div>
    </div>
  );
}
