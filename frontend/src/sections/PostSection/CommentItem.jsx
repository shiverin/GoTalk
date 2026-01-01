import PostCard from "../../components/Card/PostCard.jsx";
import PostCardContent from "../../components/Card/PostCardContent.jsx";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";

export default function CommentItem({ comment, timeAgo, user, onDelete }) {
  const isAuthor = user?.username === comment.username;

  return (
    <PostCard className="rounded-xl">
      <PostCardContent className="py-2">
        
        <div className="flex items-center justify-between mb-1">

          {/* LEFT SIDE */}
          <div className="flex gap-1 items-center">
            <div className="text-sm font-medium">{comment.username}</div>
            <div>•</div>
            <div className="text-xs text-gray-400">
              {timeAgo(comment.createdAt)}
            </div>
          </div>

          {/* RIGHT SIDE — MATCHES PostHeader EXACTLY */}
          {isAuthor && (
            <Dropdown
              align="right"
              trigger={<CircleButton size="8" />}
            >
              <DropdownItem onClick={() => onDelete(comment.id)}>
                Delete Comment
              </DropdownItem>
            </Dropdown>
          )}

        </div>

        <p>{comment.content}</p>
      </PostCardContent>
    </PostCard>
  );
}
