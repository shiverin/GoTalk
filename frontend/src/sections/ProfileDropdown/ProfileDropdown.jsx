import React from "react";
import { FaUser, FaEdit, FaDraftingCompass, FaTrophy, FaMoneyBill, FaCrown, FaMoon, FaBullhorn, FaRocket, FaCog, FaSignOutAlt } from "react-icons/fa";
import AbsoluteDropdown from "../../components/DropdownMenu/AbsoluteDropdown";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem";
import CircleButton from "../../components/CircleButton/CircleButton";

export default function ProfileDropdown({ user, logout }) {
  return (
    <AbsoluteDropdown
      align="screen-right"
      trigger={<CircleButton size="10" imgSrc={user.avatarUrl} />}
    >
        {/* User Info as a DropdownItem with avatar as icon */}
        <div
        onClick={() => console.log("Edit Avatar")}
        className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 select-none"
        >
        {/* Avatar */}
        <img
            src={user.avatarUrl}
            alt={`Avatar for ${user.username}`}
            className="w-8 h-8 rounded-full" // customize size here
        />

        {/* Text */}
        <div className="flex flex-col">
            <span className="font-semibold text-base">{user.username}</span>
            <span className="text-gray-500 text-sm">View Profile</span>
        </div>
        </div>


      {/* User Actions */}
        <DropdownItem icon={<FaEdit />} onClick={() => console.log("Edit Avatar")}>
          Edit Avatar
        </DropdownItem>
        <DropdownItem icon={<FaDraftingCompass />} onClick={() => console.log("Drafts")}>
          Drafts
        </DropdownItem>
        <DropdownItem icon={<FaTrophy />} onClick={() => console.log("Achievements")}>
          Achievements <span className="ml-1 text-xs text-gray-400">{user.achievements} unlocked</span>
        </DropdownItem>
        <DropdownItem icon={<FaMoneyBill />} onClick={() => console.log("Earn")}>
          Earn
        </DropdownItem>
        <DropdownItem icon={<FaCrown />} onClick={() => console.log("Premium")}>
          Premium
        </DropdownItem>
        <DropdownItem icon={<FaMoon />} onClick={() => console.log("Dark Mode")}>
          Dark Mode
        </DropdownItem>
        <DropdownItem icon={<FaSignOutAlt />} danger onClick={logout}>
          Log Out
        </DropdownItem>
        <DropdownItem icon={<FaBullhorn />} onClick={() => console.log("Advertise")}>
          Advertise on Reddit
        </DropdownItem>
        <DropdownItem icon={<FaRocket />} onClick={() => console.log("Try Pro")}>
          Try Reddit Pro (BETA)
        </DropdownItem>
        <DropdownItem icon={<FaCog />} onClick={() => console.log("Settings")}>
          Settings
        </DropdownItem>
    </AbsoluteDropdown>
  );
}
