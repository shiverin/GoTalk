import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import UserProfile from "../sections/UserProfile/UserProfile.jsx";
import UserBar from "../sections/UserBar/UserBar.jsx";
import { API_BASE_URL } from "../utils/api";

export default function UserProfilePage({ onLoginClick }) {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        // Fetch user
        const userRes = await fetch(`${API_BASE_URL}/api/users/${id}`, {
          credentials: "include",
        });
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch user's posts
        const postsRes = await fetch(
          `${API_BASE_URL}/api/users/${id}/posts`,
          { credentials: "include" }
        );
        const postsData = postsRes.ok ? await postsRes.json() : [];
        setPosts(postsData);

        // Fetch user's comments
        const commentsRes = await fetch(
          `${API_BASE_URL}/api/users/${id}/comments`,
          { credentials: "include" }
        );
        const commentsData = commentsRes.ok ? await commentsRes.json() : [];
        setComments(commentsData);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading profile...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!user) return <div className="text-center mt-20">User not found</div>;

  return (
    <Layout onLoginClick={onLoginClick}>
      <div className="flex">
        <UserProfile user={user} posts={posts} comments={comments} />
        <UserBar user={user} posts={posts} comments={comments} />
      </div>
    </Layout>
  );
}
