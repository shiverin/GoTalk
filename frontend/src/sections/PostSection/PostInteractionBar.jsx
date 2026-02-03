import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import PillButton from "../../components/PillButton/PillButton.jsx";
import { API_BASE_URL } from "../../utils/api";

export default function PostInteractionBar({ postId, initialScore, commentCount, userId }) {
  const [score, setScore] = useState(initialScore);
  const [vote, setVote] = useState(0); // 1 = upvote, -1 = downvote, 0 = no vote

  // Fetch current user's vote for this post
  useEffect(() => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/api/vote/${userId}/${postId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setVote(data.value))
      .catch(err => console.error(err));
  }, [userId, postId]);
  
  const handleVote = async (value) => {
    if (!userId) {
      alert("You must be logged in to vote!");
      return;
    }

    const newValue = vote === value ? 0 : value;

    try {
        let res;

        if (newValue === 0) {
          res = await fetch(`${API_BASE_URL}/api/vote`, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, postId }),
          });
        } else {
          res = await fetch(`${API_BASE_URL}/api/vote`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, postId, value: newValue }),
          });
        }

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Vote failed: ${res.status} - ${text}`);
        }

        const data = await res.json();
        setVote(data.value);
        setScore(data.score);


    } catch (err) {
      console.error("Vote error:", err);
    }
  };


  return (
    <div className="flex gap-2 text-gray-600 text-xs h-8 select-none">

      {/* VOTE GROUP */}
      <div
        className="flex w-[95px] justify-center items-center rounded-full px-1"
        style={{
          backgroundColor:
            vote === 1 ? "#D93901" : vote === -1 ? "#6A5CFF" : "#EAEDEF",
        }}
      >
        <PillButton
          bgcolor={vote === 1 ? "#D93901" : vote===-1? "#6A5CFF": "#EAEDEF"}
          txtcolor={vote === 0 ? "#6B7280" : "white"}
          px={10}
          className="hover:bg-[#EDEEEF]"
          height={32}
          onClick={() => handleVote(1)}
        >
          <ArrowUp size={16} />
        </PillButton>

        <span className="px-1 font-semibold text-gray-700"
              style={{ color: vote === 0 ? "#6B7280" : "white" }}
        >{score}</span>

        <PillButton
          bgcolor={vote === 1 ? "#D93901" : vote===-1? "#6A5CFF": "#EAEDEF"}
          txtcolor={vote === 0 ? "#6B7280" : "white"}
          px={10}
          className="hover:bg-[#EDEEEF]"
          height={32}
          onClick={() => handleVote(-1)}
        >
          <ArrowDown size={16} />
        </PillButton>
      </div>

      {/* COMMENTS BUTTON */}
      <PillButton
        bgcolor="#EAEDEF"
        txtcolor="#4B5563"
        height={32}
        px={12}
        className="hover:bg-[#EDEEEF] flex items-center gap-1"
      >
        <MessageSquare size={16} />
        <span className="font-medium">{commentCount}</span>
      </PillButton>

      {/* SHARE BUTTON */}
      <PillButton
        bgcolor="#EAEDEF"
        txtcolor="#4B5563"
        height={32}
        px={12}
        className="hover:bg-[#EDEEEF] flex items-center gap-1"
      >
        <Share2 size={14} />
        <span className="font-medium">Share</span>
      </PillButton>
    </div>
  );
}
