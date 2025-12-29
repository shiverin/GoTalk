import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommunitySelector from "./CommunitySelector";
import PostTypeTabs from "./PostTypeTabs";
import PostEditor from "./PostEditor";
import PostActions from "./PostActions";

export default function CreatePostSection() {
  const { communityId } = useParams();

  const [selectedCommunity, setSelectedCommunity] = useState(
    communityId || "" // pre-fill if URL has communityId
  );

  const communities = []; // fetch or pass as props

  return (
    <div className="w-full flex flex-col pt-5 pl-20 pr-10">
      <div className="bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-4">Create post</h1>

        <CommunitySelector
          communities={communities}
          selected={selectedCommunity}
          onSelect={setSelectedCommunity}
        />

        <PostTypeTabs />

        <PostEditor />

        <PostActions />
      </div>

      <div>footer stuff</div>
    </div>
  );
}
