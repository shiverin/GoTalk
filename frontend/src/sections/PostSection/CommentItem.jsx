import PostCard from "../../components/Card/PostCard.jsx";
import PostCardContent from "../../components/Card/PostCardContent.jsx";

export default function CommentItem({ comment, timeAgo }) {
  return (
    <PostCard className="rounded-xl">
      <PostCardContent className="p-0">
        <div className="flex gap-1 items-center mb-1">
          <div className="text-sm font-medium">{comment.username}</div>
          <div>•</div>
          <div className="text-xs text-gray-400">
            {timeAgo(comment.createdAt)}
          </div>
        </div>

        <p>{comment.content}</p>
      </PostCardContent>
    </PostCard>
  );
}
