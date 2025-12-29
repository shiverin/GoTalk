import CommentItem from "./CommentItem.jsx";

export default function CommentList({ comments, timeAgo }) {
  if (comments.length === 0)
    return <p className="text-gray-500 text-sm">No comments yet.</p>;

  return comments.map((c) => (
    <CommentItem key={c.id} comment={c} timeAgo={timeAgo} />
  ));
}
