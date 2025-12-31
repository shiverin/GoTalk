import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts.jsx";
import Popular from "../Popular/Popular.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import { FiTable } from "react-icons/fi";

export default function Content() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex mt-0 justify-between">
      {/* Left column: 70% */}
      <div className="mt-2 w-[70%] rounded-md pr-[20px] ">
        <div>
          {/* Tabs */}
          <div className=" pb-2 flex flex-start pl-[3px] pt-[1px] gap-2">
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
                  <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z" />
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
                  <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z" />
                </svg>
              </span>
            </PillButton>
            <PillButton height={30} bgcolor="#FFFFFF" txtcolor="#5C6C74" textSize={12} px="10">
              <FiTable className="w-4 h-4" />
              <span className="inline-flex ml-1">
                <svg
                  fill="currentColor"
                  height="16"
                  width="16"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 13.7a.897.897 0 01-.636-.264l-4.6-4.6a.9.9 0 111.272-1.273L10 11.526l3.964-3.963a.9.9 0 011.272 1.273l-4.6 4.6A.897.897 0 0110 13.7z" />
                </svg>
              </span>
            </PillButton>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="p-4 text-gray-500">Loading posts...</div>
          ) : (
            <Posts posts={posts} />
          )}
        </div>
      </div>

      {/* Right column: 30% */}
      <div className="w-[29.5%]">
        <Popular />
      </div>
    </div>
  );
}
