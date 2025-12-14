import Posts from "../Posts/Posts.jsx";
import React from "react";
import Popular from "../Popular/Popular.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import { FiTable } from "react-icons/fi";

export default function Content() {
    return (
        <div className="flex mt-2 justify-between">
            {/* Left column: 70% */}
            <div className="w-[70%] rounded-md pr-6 ">
                <div className="border-b pb-[2px]">
                <div className="flex flex-start pb-2 pl-[3px] pt-[1px]">
                <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10">
                Best
                <span className="inline-flex ml-1">
                    <svg
                    fill="currentColor"
                    height="16"
                    width="16"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z"></path>
                    </svg>
                </span>
                </PillButton>
                <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10">
                Everywhere
                <span className="inline-flex ml-1">
                    <svg
                    fill="currentColor"
                    height="16"
                    width="16"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z"></path>
                    </svg>
                </span>
                </PillButton>
                <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10">
                <FiTable className="w-4 h-4"/>
                <span className="inline-flex ml-1">
                    <svg
                    fill="currentColor"
                    height="16"
                    width="16"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z"></path>
                    </svg>
                </span>
                </PillButton>           
                </div>
                <Posts />
                </div>
            </div>

            {/* Right column: 30% */}
            <div className="w-[29.5%]">
                <Popular />
            </div>
        </div>
    );
}
