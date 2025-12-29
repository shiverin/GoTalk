import React from "react";
import Layout from "./Layout.jsx";
import UserProfile from "../sections/UserProfile/UserProfile.jsx";
import UserBar from "../sections/UserBar/UserBar.jsx";

export default function UserProfilePage({onLoginClick}) {
  return (
    <Layout onLoginClick={onLoginClick}>
      <div className="flex">
      <UserProfile/>
      <UserBar/>
      </div>
    </Layout>
  );
}