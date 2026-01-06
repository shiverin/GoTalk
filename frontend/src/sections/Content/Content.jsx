import React, { useState } from "react";
import Posts from "../Posts/Posts.jsx";
import Popular from "../Popular/Popular.jsx";
import PostSortDropdown from "../PostSection/PostSortDropdown.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import { FiTable } from "react-icons/fi";

export default function Content({ posts, loading, error, sortOption, setSortOption }) {
  return (
    <div className="flex mt-0 justify-between">
      <div className="mt-2 w-[70%] rounded-md pr-[20px]">

        {/* Sort Dropdown */}
        <div className="pb-2 flex gap-2">
          <PostSortDropdown selected={sortOption} onSelect={setSortOption} />
        </div>

        {/* Posts */}
        {loading ? (
          <div className="p-4 text-gray-500">
            {error || "Loading posts..."}
          </div>
        ) : (
          <Posts posts={posts} />
        )}
      </div>

      <div className="w-[29.5%]">
        <Popular />
      </div>
    </div>
  );
}
