import React, { useState } from "react";
import Header from "../sections/Header/Header.jsx";
import SideBar from "../sections/SideBar/SideBar.jsx";
import CircleButton from "../components/CircleButton/CircleButton.jsx";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { HiOutlineMenu } from "react-icons/hi";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Body: Sidebar + main content */}
      <div className="pt-[8vh] h-[100vh] relative flex">
        
        {/* Sidebar */}
        <div
          className={`
            fixed w-[18.5%] h-[90.8vh] bg-white z-20
            transform transition-transform duration-300 flex
            border-r border-gray-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-[88%]"}
          `}
        >
          <SideBar />
          <div className="mt-[19px] ml-[0px]">
            <div className="border-[1px] rounded-full border-[#808080]">
              <CircleButton
                Icon={<HiOutlineMenu className="w-[17px] h-[17px]" />}
                onClick={toggleSidebar}
                size={7.5}
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div
          className={`
            transition-all duration-300 
            flex-1 max-w-[81.5%]
            ${sidebarOpen ? "ml-[18.5%]" : "ml-[10.3%]"}
          `}
        >
          {children} {/* <-- page-specific content goes here */}
        </div>
      </div>
    </div>
  );
}
