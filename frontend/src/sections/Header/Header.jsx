import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";

import {
  MdOutlineQrCodeScanner,
  MdCampaign,
  MdChatBubbleOutline,
  MdAdd,
  MdNotificationsNone,
  MdLogin
} from "react-icons/md";

export default function Header({ onLoginClick, communityId }) {
  const { user, logout } = useAuth();

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // TODO: integrate search functionality
  };

  const navigate = useNavigate();

  return (
    <nav
      className="
        fixed top-0 left-0 right-0
        w-full h-[8vh]
        flex items-center p-3
        bg-white
        z-50
        border-b border-[#CCCCCC]
      "
    >
      {/* Logo */}
      <div className="flex-shrink-0 text-2xl font-bold text-[#FF4500] pl-3">
        goTalk
      </div>

      {/* Center: Search */}
      <div className="w-[63vw] flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right: Actions */}
      <div   className={`flex-1 justify-end flex items-center pr-[4px] ${
        user ? "gap-0" : "gap-2"
        }`}>
        {user ? (
          <>

            <span className="text-gray-700 font-medium pr-2">
              Welcome, {user.username}
            </span>

            <CircleButton
              Icon={<MdCampaign className="text-xl" />}
              size={10}
              buttonColor="white"
              onClick={logout}
            />

            <CircleButton
              Icon={<MdChatBubbleOutline className="text-xl" />}
              size={10}
              buttonColor="white"
            />

            <PillButton
              px="8"
              bgcolor="white"
              txtcolor="black"
              onClick={() =>
                navigate(communityId ? `/c/${communityId}/create` : "/create")
              }
            >
              <div className="flex items-center gap-2">
                <MdAdd className="text-xl" />
                <span>Create</span>
              </div>
            </PillButton>

            <CircleButton
              Icon={<MdNotificationsNone className="text-xl " />}
              size={10}
              buttonColor="white"
            />


            {/* Profile dropdown */}
            <Dropdown align="right" trigger={<CircleButton size="10" />}>
              <DropdownItem danger onClick={logout}>
                Log out
              </DropdownItem>
            </Dropdown>
          </>
        ) : (
          <>
            <PillButton>
              <div className="flex gap-2 items-center">
                <MdOutlineQrCodeScanner className="text-xl" />
                <span>Get App</span>
              </div>
            </PillButton>

            <PillButton
              bgcolor="#D93901"
              txtcolor="white"
              onClick={onLoginClick}
            >
              Log in
            </PillButton>

            {/* (...) Menu dropdown */}
            <Dropdown align="right" trigger={<CircleButton size="10" />}>
              <DropdownItem onClick={onLoginClick}>
                Log in / Sign up
              </DropdownItem>

              <DropdownItem onClick={() => console.log("Advertise")}>
                Advertise with goTalk
              </DropdownItem>

              <DropdownItem onClick={() => console.log("Pro")}>
                Try goTalk Pro
              </DropdownItem>
            </Dropdown>
          </>
        )}
      </div>
    </nav>
  );
}
