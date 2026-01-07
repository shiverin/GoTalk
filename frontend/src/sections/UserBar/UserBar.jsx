import React from "react";

export default function UserBar({ user, posts, comments }) {
  const createdAt = user?.createdAt;
  const username = user?.username;

  // Calculate account age
  const getAccountAge = (dateString) => {
    if (!dateString) return "";
    const created = new Date(dateString);
    const now = new Date();

    const diffMs = now - created;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays < 30) return `${Math.floor(diffDays)} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const accountAgeText = getAccountAge(createdAt);

  return (
    <div
      className={`sticky top-[8vh] w-[25vw] rounded-md flex flex-col overflow-y-auto transition-all duration-300 min-h-[654px] pr-16 pt-4`}
    >
      <div className="pt-2 px-4 bg-gray-50 rounded-md pb-5 min-h-[300px]">
        <div className="px-2 h-[200px]">
          <h2 className="font-semibold text-lg">{username}</h2>
          <p className="text-sm text-gray-600 mt-2">Account created:</p>
          <p className="text-gray-800 text-md font-medium">{accountAgeText}</p>
        </div>

        <hr />

        <div className="px-2 h-[100px] mt-4">
          <p className="text-sm text-gray-600">Number of posts:</p>
          <p className="text-gray-800 text-md font-medium">{posts?.length || 0}</p>

          <p className="text-sm text-gray-600 mt-3">Number of comments:</p>
          <p className="text-gray-800 text-md font-medium">{comments?.length || 0}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-gray-500 text-xs mt-8 pb-[13px]">
        <div className="flex flex-wrap gap-2">
          <span className="hover:underline cursor-pointer">goTalk Rules</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">User Agreement</span>
        </div>
        <div className="mt-1">Accessibility</div>
        <div className="mt-1">goTalk © 2025. All rights reserved by Shizhen Zhao.</div>
      </div>
    </div>
  );
}
