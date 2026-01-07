import React from "react";
import { getRandomColor } from "../../utils/color";
import JoinButton from "../../components/JoinButton/JoinButton";
import PillButton from "../../components/PillButton/PillButton.jsx";
import { FiTable } from "react-icons/fi";
import Posts from "../Posts/Posts.jsx";
import PostBar from "../PostBar/PostBar.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";

export async function deleteCommunity(communityId) {
  const res = await fetch(`/api/communities/${communityId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete community");
  }
}

export default function CommunitySection({ community, posts, loadingPosts }) {
  // Use a stable seed, e.g., community id or name
  const seed = community?.id || community?.name || "default";
  const bannerColor = getRandomColor(seed);

  const name = community?.name || "unknown";
  const members = community?.membersCount || 0;
  const online = community?.onlineCount || 0;
  const description = community?.description || "No description available";
  const createdAt = community?.createdAt || "Unknown date";
  const { user } = useAuth(); // ⬅️ current logged-in user

  const isOwner = user?.id === community?.owner_id; // ⬅️ check owner
  async function onDeleteCommunity(id) {
    if (!confirm("Are you sure you want to delete this community?")) return;

    try {
      await deleteCommunity(id);
      window.location.href = "/"; // Redirect after delete
    } catch (err) {
      console.error(err);
      alert("Failed to delete community");
    }
  }
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
          <div className="flex gap-2">
              <JoinButton communityId={community?.id} />
              {/* Owner-only button */}
              {isOwner && (
                <Dropdown
                  align="right"
                  trigger={<CircleButton size="8" />}
                >
                  <DropdownItem onClick={() => onDeleteCommunity(community.id)}>
                    Delete Community
                  </DropdownItem>
                </Dropdown>
              )}
          </div>
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
          <PostBar communityName={`${name}`} />
        </div>
      </div>
    </div>
  );
}
