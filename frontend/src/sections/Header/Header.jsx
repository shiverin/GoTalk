import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext.jsx";

export default function Header({ onLoginClick }) {
  const { user, logout } = useAuth();

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // TODO: integrate search functionality
  };

  return (
    <nav className="
      fixed top-0 left-0 right-0
      w-full h-[8vh]
      flex items-center p-3
      bg-white
      z-50
      border-b border-[#CCCCCC]
    ">
      {/* Logo */}
      <div className="flex-shrink-0 text-2xl font-bold text-[#FF4500] pl-3">goTalk</div>

      {/* Center: Search */}
      <div className="flex-1 text-center flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">Welcome, {user.username}</span>

            <PillButton bgcolor="#D93901" txtcolor="white" onClick={logout}>
              Log out
            </PillButton>

            <CircleButton size="10" /> {/* Could be profile pic */}
          </>
        ) : (
          <>
            <PillButton>
              <div className="flex gap-2 items-center">   
                <MdOutlineQrCodeScanner className="text-xl cursor-pointer"/>
                <div>Get App</div>
              </div>     
            </PillButton>

            <PillButton bgcolor="#D93901" txtcolor="white" onClick={onLoginClick}>
              Log in
            </PillButton>

            <CircleButton size="10" />
          </>
        )}
      </div>
    </nav>
  );
}
