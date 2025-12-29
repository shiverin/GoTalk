import PillButton from "../../components/PillButton/PillButton.jsx";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";

export default function PostSortDropdown() {
  return (
    <Dropdown
      align="left"
      trigger={(open) => (
        <PillButton
          isOpen={open}
          height={30}
          bgcolor="#FFFFFF"
          txtcolor="#5C6C74"
          textSize={12}
          px="10"
          className="flex items-center gap-1 hover:bg-gray-100"
        >
          Best
          <span className="inline-flex ml-1">
            <svg fill="currentColor" height="16" width="16" viewBox="0 0 20 20">
              <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z"></path>
            </svg>
          </span>
        </PillButton>
      )}
    >
      <DropdownItem>Best</DropdownItem>
      <DropdownItem>Top</DropdownItem>
      <DropdownItem>New</DropdownItem>
    </Dropdown>
  );
}
