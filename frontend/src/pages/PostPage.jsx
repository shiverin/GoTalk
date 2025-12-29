import React from "react";
import Layout from "./Layout.jsx";
import PostSection from "../sections/PostSection/PostSection.jsx";
import PostBar from "../sections/PostBar/PostBar.jsx";

export default function PostPage({onLoginClick}) {
  return (
    <Layout onLoginClick={onLoginClick}>
      <div className="flex ">
      <PostSection/>
      <PostBar/>
      </div>
    </Layout>
  );
}
