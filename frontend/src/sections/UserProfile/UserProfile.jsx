import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostCard from "../../components/Card/PostCard.jsx";
import PostCardContent from "../../components/Card/PostCardContent.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";

export default function UserProfile() {

  return (
    <div className="flex flex-col w-[57vw] pl-16 pr-5">
        <div className="h-[30vh]">
            <div className="flex gap-2 h-[15vh]">
                <div>Profile pic</div>
                <div className="flex flex-col">
                    <div>name
                    </div>
                    <div>username
                    </div>
                </div>
            </div>
            <div className="flex">
                <PillButton>Overview</PillButton>
                <PillButton>Posts</PillButton>
                <PillButton>Comments</PillButton>
            </div>
            <div>
                <PillButton bgcolor="white">Feed Options</PillButton>
            </div>
        </div>
        <hr></hr>
        <div>
            (Overview)
        </div>
    </div>

  );
}
