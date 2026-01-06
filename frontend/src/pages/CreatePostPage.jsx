import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import CreatePostSection from "../sections/CreatePost/CreatePostSection.jsx";

export default function CreatePostPage({onLoginClick}) {

  return (
    <Layout onLoginClick={onLoginClick}>
      <div className="flex w-[56vw]">
        <CreatePostSection />
      </div>
    </Layout>
  );
}
