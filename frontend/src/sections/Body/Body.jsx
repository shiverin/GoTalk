import React, { useState } from "react";
import Main from "../Main/Main.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Body() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="pt-[8vh] h-[100vh]">
      {/* Parent container that limits content width */}
      <div className="relative flex text-center">

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
          {/* Sidebar toggle button */}
          <div className="mt-5 mr-0">          
            <div className="border-2 rounded-full border-[#808080] bg" >
              <CircleButton
                icon={<Bars3Icon className="w-6 h-6" />}
                onClick={toggleSidebar}
                size={7}
              />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`
            transition-all duration-300 
            flex-1 max-w-[81.5%]
            ${sidebarOpen ? "ml-[18.5%]" : "ml-[10.3%]"}
          `}
        >
          <Main />
        </div>
      </div>
    </div>
  );
}