import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Button from "../../components/Button/Button.jsx";

export default function Header() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // TODO: integrate search functionality
  };

  return (
    <nav className="w-full h-[10vh] flex justify-between items-center p-6 bg-gray-100 z-50">

      <div className="text-2xl font-bold">GoTalk</div>

      <div className="flex gap-4 items-center">
        <SearchBar onSearch={handleSearch} />
        <Button text="Sign Up" />
      </div>
    </nav>
  );
}
