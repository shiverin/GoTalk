import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import UserProfile from "../sections/UserProfile/UserProfile.jsx";
import UserBar from "../sections/UserBar/UserBar.jsx";

export default function UserProfilePage({ onLoginClick }) {
  const { id } = useParams(); // grabs :id from /users/:id
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/api/users/${id}`, {
          credentials: "include", // if your API uses cookies
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data); // assumes API returns the user object
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading user...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!user) return <div className="text-center mt-20">User not found</div>;

  return (
    <Layout onLoginClick={onLoginClick}>
      <div className="flex">
        <UserProfile user={user} />
        <UserBar user={user} />
      </div>
    </Layout>
  );
}
