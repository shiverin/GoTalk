import React, { useState } from "react";
import PillButton from "../../components/PillButton/PillButton.jsx";
import UserProfileFeed from "./UserProfileFeed.jsx";
import { API_BASE_URL } from "../../utils/api";

const randomIconUrl = (seed) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec} sec ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? "s" : ""} ago`;
  return `${diffDay} d ago`;
}


export default function UserProfile({ user, posts, comments }) {
    const [localComments, setLocalComments] = useState(comments);
    const [activeTab, setActiveTab] = useState("overview");

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

    setLocalComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error(err);
      alert("Could not delete comment.");
    }
  };

    const mergedFeed = [
    ...posts.map(p => ({
        type: "post",
        id: p.post.id,
        date: p.post.createdAt,
        data: p, 
    })),
    ...localComments.map(c => ({
        type: "comment",
        id: c.id,
        date: c.createdAt,
        data: {
        ...c,
        username: user.username, 
        userId: user.id            
        }
    }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredFeed =
    activeTab === "overview"
      ? mergedFeed
      : activeTab === "posts"
      ? mergedFeed.filter((i) => i.type === "post")
      : mergedFeed.filter((i) => i.type === "comment");

  return (
    <div className="flex flex-col w-[57vw] pl-16 pr-5">
        <div className="h-[30vh]">
            <div className="flex gap-4 h-[15vh] pt-4 pl-4">
                <div><img src={randomIconUrl("default")} alt="Profile" className="w-16 h-16 rounded-full" /></div>
                <div className="flex flex-col">
                     <div className="text-2xl font-bold">{user.username}
                    </div>
                    <div className="text-gray-600">g/{user.username}
                    </div>
                </div>
            </div>
            <div className="mt-1 ml-1 flex gap-3">
                <PillButton
                bgcolor={activeTab === "overview" ? "#C9D7DE" : "white"}
                txtcolor={activeTab === "overview" ? "black" : "black"}
                onClick={() => setActiveTab("overview")}
                >
                Overview
                </PillButton>

                <PillButton
                bgcolor={activeTab === "posts" ? "#C9D7DE" : "white"}
                txtcolor={activeTab === "posts" ? "black" : "black"}
                onClick={() => setActiveTab("posts")}
                >
                Posts
                </PillButton>

                <PillButton
                bgcolor={activeTab === "comments" ? "#C9D7DE" : "white"}
                txtcolor={activeTab === "comments" ? "black" : "black"}
                onClick={() => setActiveTab("comments")}
                >
                Comments
                </PillButton>

            </div>
        </div>
        <hr></hr>
        <UserProfileFeed
            mergedFeed={filteredFeed}
            timeAgo={timeAgo}
            onDelete={handleDeleteComment}
            user={user}
        />
    </div>

  );
}