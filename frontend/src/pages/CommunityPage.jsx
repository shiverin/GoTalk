import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import CommunitySection from "../sections/Community/CommunitySection";

export default function CommunityPage({onLoginClick}) {
const { id } = useParams();
console.log(id);

  return (
    <Layout onLoginClick={onLoginClick} communityId={id}>
        <CommunitySection/>
    </Layout>
  );
}
