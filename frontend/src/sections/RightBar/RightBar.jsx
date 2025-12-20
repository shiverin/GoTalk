import Content from "../Content/Content.jsx";
import React from "react";
import CardSlides from "../CardSlides/CardSlides.jsx";


export default function RightBar() {
    return (
    <div
      className={`sticky top-[8vh] w-[25vw] rounded-md flex flex-col overflow-y-auto transition-all duration-300 h-[654px] pr-16`}
    >
      <div className="pt-2 px-4 bg-gray-50 rounded-md pb-5 h-[400px]"
      >
        <div className="px-2 h-[200px]">Pratatim</div>

        <hr></hr>
        <div className="px-2 h-[200px]">tungtungtung</div>
      </div>
            <div className="flex flex-col gap-1 text-gray-500 text-xs mt-8 pb-[13px]">
                {/* First line */}
                <div className="flex flex-wrap gap-2">
                    <span className="hover:underline cursor-pointer">goTalk Rules</span>
                    <span className="hover:underline cursor-pointer">Privacy Policy</span>
                    <span className="hover:underline cursor-pointer">User Agreement</span>
                </div>

                {/* Second line */}
                <div className="mt-1">
                    Accessibility goTalk © 2025. All rights reserved by Shizhen Zhao.
                </div>
      </div>
    </div>
);
}

