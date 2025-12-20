import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext.jsx";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";

export default function Header({ onLoginClick }) {
  const { user, logout } = useAuth();

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // TODO: integrate search functionality
  };

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
      <div className="flex-1 flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">
              Welcome, {user.username}
            </span>

            <PillButton bgcolor="#D93901" txtcolor="white" onClick={logout}>
              Log out
            </PillButton>

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
