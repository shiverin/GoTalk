import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Button from "../../components/Button/Button.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";

export default function Header() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // TODO: integrate search functionality
  };

  return (
    <nav className="w-full h-[8.2vh] flex items-center p-6 bg-white z-50 border-b border-[#CCCCCC] ">

      <div className="flex-shrink-0 text-2xl font-bold text-[#FF4500]">goTalk</div>

      <div className="flex-1 text-center flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex flex-shrink-0 items-center">
        <PillButton text="Get App" />
        <PillButton text="Log in" bgcolor="#D93901" txtcolor="white"/>
        <CircleButton size="10" />
      </div>
    </nav>
  );
}
