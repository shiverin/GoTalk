import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import PillButton from "../../components/PillButton/PillButton.jsx";

export default function PostInteractionBar({ score, commentCount }) {
  return (
    <div className="flex gap-4 text-gray-600 text-xs h-10">
      <div className="flex gap-0 bg-[#E5EBEE] items-center rounded-full">
        <PillButton><ArrowUp /></PillButton>
        <span>{score}</span>
        <PillButton><ArrowDown /></PillButton>
      </div>

      <PillButton className="flex items-center gap-1">
        <MessageSquare size={18} /> {commentCount}
      </PillButton>

      <PillButton>
        <div className="flex items-center gap-2">
          <Share2 size={15} />
          <div>Share</div>
        </div>
      </PillButton>
    </div>
  );
}
