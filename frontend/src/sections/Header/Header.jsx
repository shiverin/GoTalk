import React from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // TODO: integrate search functionality
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-gray-100">
      <div className="text-2xl font-bold">GoTalk</div>

      <div className="flex gap-4 items-center">
        <SearchBar onSearch={handleSearch} />
        <Button text="Sign Up" />
      </div>
    </nav>
  );
}
