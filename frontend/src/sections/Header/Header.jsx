import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Button from "../../components/Button/Button.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { MdOutlineQrCodeScanner } from "react-icons/md";

export default function Header() {
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
      <div className="flex-shrink-0 text-2xl font-bold text-[#FF4500] pl-3">goTalk</div>

      <div className="flex-1 text-center flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="border flex items-center gap-2">
        <PillButton>
          <div className="flex gap-2">   
            <MdOutlineQrCodeScanner className="text-xl cursor-pointer"/>
            <div>Get App</div>
          </div>     
        </PillButton>
        <PillButton bgcolor="#D93901" txtcolor="white">Log in</PillButton>
        <CircleButton size="10" />
      </div>
    </nav>
  );
}
