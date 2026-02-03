import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";   
import PostCard from "../../components/Card/PostCard.jsx";
import PostCardContent from "../../components/Card/PostCardContent.jsx";

import PostHeader from "./PostHeader.jsx";
import PostInteractionBar from "./PostInteractionBar.jsx";
import PostSortDropdown from "./PostSortDropdown.jsx";
import CommentList from "./CommentList.jsx";
import { useAuth } from "../../context/AuthContext.jsx";           
import CommentBar from "../../components/CommentBar/CommentBar.jsx";
import { API_BASE_URL } from "../../utils/api";

import PostBar from "../PostBar/PostBar.jsx"; // <-- import sidebar

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

export default function PostSection() {
  const navigate = useNavigate();                                 
  const { user } = useAuth();                                  
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState("");
  const [community, setCommunity] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");

    // Handle submitting a new comment
  const handleCommentSubmit = async () => {
    if (!query.trim()) return;

    if (!user) {
      alert("Please log in to comment.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/posts/${id}/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: query.trim() }),
      });

      if (!res.ok) throw new Error("Failed to create comment");

      const newComment = await res.json();

      setComments((prev) => [
        ...prev,
        {
          ...newComment,
          username: user.username,
        },
      ]);

      // Reset input
      setQuery("");
    } catch (err) {
      console.error(err);
      alert("Could not submit comment.");
    }
  };

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

      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
      alert("Could not delete comment.");
    }
  };

  // Handle deleting the post
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      // Redirect to community page after deletion
      navigate(`/communities/${community.id}`);
    } catch (err) {
      console.error(err);
      alert("Could not delete post.");
    }
  };

  // Handle editing the post
  const handleEdit = () => {
    navigate(`/posts/${id}/edit/${community?.id}`);
  };

  // Fetch post data
  useEffect(() => {
    async function fetchPost() {
      if (!id) {
        setError("Invalid post ID");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/posts/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text}`);
        }

        const data = await res.json();

        setPost(data.post);
        setAuthor(data.author);
        setCommunity(data.community);
        setComments(data.comments ?? []);
      } catch (err) {
        console.error("Failed to load post:", err);
        setError("Failed to load post. Check if the API endpoint exists.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full p-10 text-lg">
        Loading post...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-full p-10 text-lg text-red-600">
        {error}
        <Link to="/" className="text-blue-600 underline mt-4">
          ← Back to feed
        </Link>
      </div>
    );

  if (!post)
    return (
      <div className="flex justify-center items-center h-full p-10 text-lg">
        Post not found.
      </div>
    );

  const isAuthor = user?.id === author?.id;

  return (
    <div className="flex justify-center gap-0 w-full pt-6">
      {/* Left: Post content */}
      <div className="pl-16 flex-1 flex flex-col gap-4 pr-4">
        <PostCard>
          <PostCardContent padding="p-0">
            <PostHeader
              community={community}
              author={author}
              createdAt={post.createdAt}
              timeAgo={timeAgo}
              isAuthor={isAuthor}            
              onDelete={() => handleDelete(post.id)}         
              onEdit={handleEdit}     
              authorId={author?.id}
            />

            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-base leading-relaxed mb-6">{post.content}</p>

            {post.link && post.link.trim() !== "" && (
              <div className="mb-4">
                <a
                  href={post.link.startsWith("http") ? post.link : `https://${post.link}`}
                  className="text-base cursor-pointer underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.link}
                </a>
              </div>
            )}

            <PostInteractionBar
              postId={post.id}             
              userId={user?.id}            
              initialScore={post.score ?? 0} 
              commentCount={comments.length}
            />
          </PostCardContent>
        </PostCard>

        <div className="pr-0">
          <CommentBar
            query={query}
            setQuery={setQuery}
            onSubmit={handleCommentSubmit}
          />
        </div>

        <div className="px-0 flex items-center gap-2">
          <div className="text-xs font-light">Sort by:</div>
          <PostSortDropdown selected="Best" onSelect={(s) => console.log("Sort:", s)} />
        </div>

        <CommentList
          comments={comments}
          timeAgo={timeAgo}
          user={user}
          onDelete={handleDeleteComment}
        />
      </div>

      {/* Right: Sidebar */}
      <div className="w-[26vw] pl-1">
        {community && <PostBar communityName={community.name} />}
      </div>
    </div>
  );
}
