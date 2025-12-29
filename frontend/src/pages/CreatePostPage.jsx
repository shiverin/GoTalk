import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import CreatePostSection from "../sections/CreatePost/CreatePostSection.jsx";

export default function CreatePostPage({onLoginClick}) {
const { communityId } = useParams();
console.log(communityId);

  return (
    <Layout onLoginClick={onLoginClick} communityId={communityId}>
      <div className="flex w-[56vw]">
        <CreatePostSection />
      </div>
    </Layout>
  );
}
