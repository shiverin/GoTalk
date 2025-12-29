import React from "react";
import Layout from "./Layout.jsx";
import CommunityList from "../sections/Community/CommunityList";

export default function CommunityListPage({onLoginClick}) {
  return (
    <Layout onLoginClick={onLoginClick}>
        <CommunityList/>
    </Layout>
  );
}
