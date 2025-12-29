import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunitySelector from "./CommunitySelector";
import PostTypeTabs from "./PostTypeTabs";
import PostEditor from "./PostEditor";
import PostActions from "./PostActions";

export default function CreatePostSection() {
  const { communityId, postId } = useParams(); // postId for editing
  const navigate = useNavigate();

  const [selectedCommunity, setSelectedCommunity] = useState(communityId || null);
  const [postType, setPostType] = useState("text"); // 'text', 'link', 'image'
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [communities, setCommunities] = useState([]);

  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  // Fetch all communities from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/communities", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch communities");
        return res.json();
      })
      .then(data => setCommunities(data))
      .catch(err => console.warn("Failed to fetch communities:", err));
  }, [token]);

  // Prefill data if editing
  useEffect(() => {
    if (!postId) return;

    fetch(`http://localhost:8080/api/posts/${postId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then(data => {
        setTitle(data.post.title);
        setContent(data.post.content || "");
        setLink(data.post.link || "");
        setSelectedCommunity(data.post.community?.id || "");
        setPostType(data.post.link ? "link" : "text");
      })
      .catch(err => console.error("Failed to fetch post for editing:", err));
  }, [postId, token]);

  const handleSubmit = async () => {
    if (!title || !selectedCommunity) {
      alert("Please provide a title and select a community.");
      return;
    }

    if (!token) {
      alert("You must be logged in to create or edit a post.");
      return;
    }

    const payload = {
      title,
      content: postType === "text" ? content : "",
      link: postType === "link" ? link : "",
      communityId: selectedCommunity,
    };

    const url = postId
      ? `http://localhost:8080/api/posts/${postId}`
      : "http://localhost:8080/api/posts";
    const method = postId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save post");
      const data = await res.json();
      navigate(`/posts/${data.id || postId}`); // redirect to the post page
    } catch (err) {
      console.error(err);
      alert("Error saving post.");
    }
  };

  const handleDelete = async () => {
    if (!postId) return;

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete post");
      navigate(`/r/${selectedCommunity}`);
    } catch (err) {
      console.error(err);
      alert("Error deleting post.");
    }
  };

  return (
    <div className="w-full flex flex-col pt-5 pl-20 pr-10">
      <div className="bg-white rounded-md p-0 shadow">
        <h1 className="text-2xl font-bold mb-4">
          {postId ? "Edit Post" : "Create post"}
        </h1>

        <CommunitySelector
          communities={communities}
          selected={selectedCommunity}
          onSelect={setSelectedCommunity}
        />

        <PostTypeTabs selected={postType} onSelect={setPostType} />

        <PostEditor
          postType={postType}
          title={title}
          content={content}
          link={link}
          onChangeTitle={setTitle}
          onChangeContent={setContent}
          onChangeLink={setLink}
        />

        <PostActions
          onSubmit={handleSubmit}
          onDelete={postId ? handleDelete : undefined}
          isEdit={!!postId}
        />
      </div>
    </div>
  );
}
