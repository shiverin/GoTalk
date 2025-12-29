import React, { useState } from "react";  
import { useNavigate, useLocation } from "react-router-dom";
import VerticalMenu from "../../components/VerticalMenu/VerticalMenu.jsx";  
import Resources from "../../sections/Resources/Resources.jsx";
  
// Icons (using a library like 'lucide-react' is a clean way to handle this)  
import { Home, Compass, BarChart2 } from 'lucide-react';   
  
export default function SideBar() {  
  const [selected, setSelected] = useState("Home"); // Default to 'Home'  
  const navigate = useNavigate(); // React Router's navigation hook
  const location = useLocation(); // <-- current URL
  console.log(location);

  // Define your menu items with icons  
  const mainMenuItems = [  
    { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },  
    { id: "popular", label: "Popular", icon: <BarChart2 size={20} />, href: "/communities" },  
    { id: "explore", label: "Explore", icon: <Compass size={20} />, href: "/communities" },  
  ];  
    
    
  // Define items for the resources section  
  const resourceItems = [  
    { label: "About goTalk", href: "#" },  
    { label: "Help", href: "#" },  
  ];  
  
  // Determine which item is active based on current URL
  const currentSelected = mainMenuItems.find(item => item.href === location.pathname)?.id || "home";

  const handleSelect = (item) => {
    if (item.href) {
      navigate(item.href);
    }
  };

  return (  
    // The main sidebar container  
    <nav className="box-border flex flex-col w-[100%] shrink-0 bg-white select-none pl-4 pr-6 overflow-y-auto">  
      <div> 
      {/* Section 1: Main Links */}  
      <div className="pt-4 pb-1">  
        <VerticalMenu  
          items={mainMenuItems}  
          selectedItem={currentSelected}
          onSelect={handleSelect}
        />  
      </div>  
  
      {/* Divider */}  
      <hr className="mx-0 my-2 border-gray-200" />  
  
      {/* Section 2: Resources (Expandable) */}  
      <div className="pt-1">  
        <Resources items={resourceItems} />  
      </div>  
      </div> 
      {/* Footer Section (Pushes to the bottom) */}  
      <div className="mt-auto p-4">  
        <p className="text-xs text-gray-500">goTalk © 2025</p>  
      </div>  
        
    </nav>  
  );  
}