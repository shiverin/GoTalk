import React from "react";
import Layout from "./Layout.jsx";
import PostSection from "../sections/PostSection/PostSection.jsx";
import RightBar from "../sections/RightBar/RightBar.jsx";

export default function LandingPage({onLoginClick}) {
  return (
    <Layout onLoginClick={onLoginClick}>
      <div className="flex ">
      <PostSection/>
      <RightBar/>
      </div>
    </Layout>
  );
}
