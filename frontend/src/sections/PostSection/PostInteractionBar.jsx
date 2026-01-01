import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import PillButton from "../../components/PillButton/PillButton.jsx";

export default function PostInteractionBar({ score, commentCount }) {
  return (
    <div className="flex gap-2 text-gray-600 text-xs h-8 select-none">

      {/* VOTE GROUP */}
      <div className="flex items-center bg-[#EAEDEF] rounded-full px-1">
        <PillButton
          bgcolor="#EAEDEF"
          txtcolor="#6B7280"
          px={10}
          className="hover:bg-[#EDEEEF]"
          height={32}
        >
          <ArrowUp size={16} />
        </PillButton>

        <span className="px-1 font-semibold text-gray-700">{score}</span>

        <PillButton
          bgcolor="#EAEDEF"
          txtcolor="#6B7280"
          px={10}
          className="hover:bg-[#EDEEEF]"
          height={32}
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
