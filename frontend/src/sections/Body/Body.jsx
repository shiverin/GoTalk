import React from "react";
import Posts from "../Posts/Posts.jsx";
import SideBar from "../SideBar/SideBar.jsx";

export default function Body() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar: 20% width */}
      <div className="w-1/5 bg-gray-100">
        <SideBar />
      </div>

      {/* Main content: 80% width */}
      <div className="w-4/5 bg-gray-50 p-6">
        <Posts />
      </div>
    </div>
  );
}
