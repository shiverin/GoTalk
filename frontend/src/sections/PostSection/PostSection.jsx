import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";   
import PostCard from "../../components/Card/PostCard.jsx";
import PostCardContent from "../../components/Card/PostCardContent.jsx";

import PostHeader from "./PostHeader.jsx";
import PostInteractionBar from "./PostInteractionBar.jsx";
import PostSortDropdown from "./PostSortDropdown.jsx";
import CommentList from "./CommentList.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";           
import CommentBar from "../../components/CommentBar/CommentBar.jsx";

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

 const handleCommentSubmit = async () => {
  if (!query.trim()) return;

  if (!user) {
    alert("Please log in to comment.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:8080/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const handleDeleteComment = async (commentId) => {
  if (!window.confirm("Delete this comment?")) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/api/comments/${commentId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!res.ok) throw new Error("Failed to delete");

    setComments((prev) => prev.filter((c) => c.id !== commentId));
  } catch (err) {
    console.error(err);
    alert("Could not delete comment.");
  }
};

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete");

      // Redirect to community page after deletion
      navigate(`/communities/${community.id}`);
    } catch (err) {
      console.error(err);
      alert("Could not delete post.");
    }
  };

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
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
        const res = await fetch(`http://localhost:8080/api/posts/${id}`);
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

const isAuthor = user?.id === post?.author_id;

  return (
    <div className="flex justify-center w-[57vw] pl-12 pr-3">
      <div className="w-full flex gap-4">
        <div className="flex flex-col gap-4 w-full pt-3">
          <PostCard className="rounded-2xl">
            <PostCardContent className="p-0">

              {/* Post header */}
              <PostHeader
                community={community}
                author={author}
                createdAt={post.createdAt}
                timeAgo={timeAgo}
                isAuthor={isAuthor}            
                onDelete={handleDelete}         
                onEdit={handleEdit}            
              />

              {/* Post title */}
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

              {/* Post content */}
              <p className="text-base leading-relaxed mb-6">{post.content}</p>

              <PostInteractionBar
                score={post.score ?? 0}
                commentCount={comments.length}
              />
            </PostCardContent>
          </PostCard>

          <div className="px-4">
            <CommentBar
              query={query}
              setQuery={setQuery}
              onSubmit={handleCommentSubmit}
            />
          </div>
          <div className="px-4 flex items-center gap-1">
            <div className="text-xs font-light">Sort by:</div>
          <PostSortDropdown />
          </div>

          <CommentList
            comments={comments}
            timeAgo={timeAgo}
            user={user}
            onDelete={handleDeleteComment}
          />


        </div>
      </div>
    </div>
  );
}
