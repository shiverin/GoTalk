import CommentItem from "./CommentItem.jsx";

export default function CommentList({ comments, timeAgo, user, onDelete }) {
  if (!comments || comments.length === 0)
    return <p className="text-gray-500 text-sm px-4">No comments yet.</p>;

  return (
    <div className="flex-col "> 
      {comments.map((c) => (
        <CommentItem 
          key={c.id}
          comment={c}
          timeAgo={timeAgo}
          user={user}
          onDelete={onDelete} />
      ))}
    </div>
  );
}
