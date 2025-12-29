import React from "react";
import AbsoluteDropdown from "../../components/DropdownMenu/AbsoluteDropdown";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem";
import CircleButton from "../../components/CircleButton/CircleButton";
import { FaSignInAlt, FaBullhorn, FaRocket } from "react-icons/fa";

export default function NoProfileDropdown({ onLoginClick }) {
  return (
    <AbsoluteDropdown align="screen-right" trigger={<CircleButton size="10" />}>
      <DropdownItem icon={<FaSignInAlt />} onClick={onLoginClick}>
        Log in / Sign up
      </DropdownItem>

      <DropdownItem icon={<FaBullhorn />} onClick={() => console.log("Advertise")}>
        Advertise with goTalk
      </DropdownItem>

      <DropdownItem icon={<FaRocket />} onClick={() => console.log("Pro")}>
        Try goTalk Pro
      </DropdownItem>
    </AbsoluteDropdown>
  );
}
