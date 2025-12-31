import React from "react";
import { getRandomColor } from "../../utils/color";
import JoinButton from "../../components/JoinButton/JoinButton";
import PillButton from "../../components/PillButton/PillButton.jsx";
import { FiTable } from "react-icons/fi";
import Posts from "../Posts/Posts.jsx";

export default function CommunitySection({ community, posts, loadingPosts }) {
  // Use a stable seed, e.g., community id or name
  const seed = community?.id || community?.name || "default";
  const bannerColor = getRandomColor(seed);

  const name = community?.name || "unknown";
  const members = community?.membersCount || 0;
  const online = community?.onlineCount || 0;
  const description = community?.description || "No description available";
  const createdAt = community?.createdAt || "Unknown date";

  return (
    <div className="px-16 pt-2">
      {/* Banner */}
      <div
        className=" w-full h-28 rounded-lg "
        style={{ backgroundColor: bannerColor }}
      ></div>

      {/* Community Header */}
      <div className="bg-white px-6 pt-4 relative">
        <div
          className="w-20 h-20 rounded-full border-4 border-white absolute -top-10"
          style={{ backgroundColor: bannerColor }}
        ></div>

        <div className="ml-24 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">g/{name}</h1>
          </div>
          <JoinButton communityId={community?.id} />
        </div>
      </div>

      {/* Page Layout */}
      <div className="max-w-6xl mx-auto flex gap-6 mt-6 px-0">
        {/* Left: Posts */}
        <div className="w-[70vw]">

      <div className=" pb-2 flex flex-start pl-[0px] pt-[0px]">

          <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10">
          Best
          <span className="inline-flex ml-1">
              <svg
              fill="currentColor"
              height="16"
              width="16"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z"></path>
              </svg>
          </span>
          </PillButton>
          <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10">
          <FiTable className="w-4 h-4"/>
          <span className="inline-flex ml-1">
              <svg
              fill="currentColor"
              height="16"
              width="16"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z"></path>
              </svg>
          </span>
          </PillButton>           
          </div>

          <div className="bg-white mx-2 rounded-md p-4 shadow-sm mb-4 hover:border-gray-400">
            <h2 className="font-semibold text-lg">Welcome to g/{name}!</h2>
            <p className="text-gray-700 mt-2">{description}</p>
          </div>
          {/* Posts */}
          {loadingPosts ? (
            <div className="p-4 text-gray-500">Loading posts...</div>
          ) : (
            <Posts posts={posts} />
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="w-[30vw]">
          <div
                className={`sticky top-[8vh] rounded-md flex flex-col justify-between overflow-y-auto transition-all duration-300 h-[654px]`}
              >
                <div className="mt-0 pt-2 px-4 bg-gray-50 rounded-md pb-5"
                  style={{ minHeight: "380px" }} // dynamic height
                >
                <h2 className="text-black font-semibold text-xs mt-6 mb-8">
                  hihi
                </h2>
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
        </div>
      </div>
    </div>
  );
}
