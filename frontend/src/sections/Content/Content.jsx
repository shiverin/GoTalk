import Posts from "../Posts/Posts.jsx";
import React from "react";
import Popular from "../Popular/Popular.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";

export default function Content() {
    return (
        <div className="flex gap-4">
            {/* Left column: 70% */}
            <div className="w-[70%]">
                <div
                className="flex flex-start"
                >
                <PillButton text="Best" bgcolor="#FFFFFF" txtcolor="black"/>
                <PillButton text="Everywhere" bgcolor="#FFFFFF" txtcolor="black"/>
                <PillButton text="--" bgcolor="#FFFFFF" txtcolor="black"/>   
                </div>
                <Posts />
            </div>

            {/* Right column: 30% */}
            <div className="w-[30%]">
                <Popular />
            </div>
        </div>
    );
}
