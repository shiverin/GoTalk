import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VerticalMenu from "../../components/VerticalMenu/VerticalMenu.jsx";
import Resources from "../../sections/Resources/Resources.jsx";
import { Home, Compass, BarChart2, Plus } from "lucide-react";
import CreateCommunityModal from "../../components/CreateCommunityModal/CreateCommunityModal.jsx";

export default function SideBar() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },
    { id: "popular", label: "Popular", icon: <BarChart2 size={20} />, href: "/popular" },
    { id: "explore", label: "Explore", icon: <Compass size={20} />, href: "/communities" },

    // 👇 Non-selectable custom action item
    {
      id: "start-community",
      label: "Start a community",
      icon: <Plus size={20} />,
      noSelect: true,
      onClick: () => setShowCreateModal(true),
    },
  ];

  const resourceItems = [
    { label: "About goTalk", href: "#" },
    { label: "Help", href: "#" },
  ];

  // Determine which menu item should look selected
  const currentSelected =
    mainMenuItems.find((item) => item.href === location.pathname)?.id || "home";

  // Navigation handler
  const handleSelect = (item) => {
    if (item.href) navigate(item.href);
  };

  return (
    <>
      <nav className="box-border flex flex-col w-full shrink-0 bg-white select-none pl-4 pr-6 overflow-y-auto">
        <div>
          {/* MAIN MENU */}
          <div className="pt-4 pb-1">
            <VerticalMenu
              items={mainMenuItems}
              selectedItem={currentSelected}
              onSelect={handleSelect}
            />
          </div>

          <hr className="mx-0 my-2 border-gray-200" />

          {/* RESOURCES */}
          <div className="pt-1">
            <Resources items={resourceItems} />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto p-4">
          <p className="text-xs text-gray-500">goTalk © 2025</p>
        </div>
      </nav>

      {/* REAL MODAL (your component) */}
      {showCreateModal && (
        <CreateCommunityModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}