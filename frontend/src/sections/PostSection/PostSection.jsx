import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUp, ArrowDown, MessageSquare, Share2 } from "lucide-react";
import PostCard from "../../components/Card/PostCard.jsx";
import PostCardContent from "../../components/Card/PostCardContent.jsx";
import PillButton from "../../components/PillButton/PillButton.jsx";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // optional icon


// Helper function to compute "time ago"
function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec} sec ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? "s" : ""} ago`;
  return `${diffDay} d ago`;
}

export default function PostSection() {

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || query.length > 0;

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState("");
  const [community, setCommunity] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      if (!id) {
        setError("Invalid post ID");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`http://localhost:8080/api/posts/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text}`);
        }

        const data = await res.json();
        setPost(data.post);
        setAuthor(data.author);
        setCommunity(data.community);
        setComments(data.comments ?? []);
      } catch (err) {
        console.error("Failed to load post:", err);
        setError("Failed to load post. Check if the API endpoint exists.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full p-10 text-lg">
        Loading post...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-full p-10 text-lg text-red-600">
        {error}
        <Link to="/" className="text-blue-600 underline mt-4">
          ← Back to feed
        </Link>
      </div>
    );

  if (!post)
    return (
      <div className="flex justify-center items-center h-full p-10 text-lg">
        Post not found.
      </div>
    );

  return (
    <div className="flex justify-center w-[57vw] pl-16 pr-5">
      <div className="w-full flex gap-4">
        {/* Main post content */}
        <div className="flex flex-col gap-4 w-full pt-8">
          <PostCard className="rounded-2xl">
            <PostCardContent className="p-0">
              {/* Post header */}
              <div className="flex justify-between">
                  <div className="flex items-center justify-start gap-2 text-sm text-gray-500 mb-2">
                    <Link to="/" className="rounded-full bg-[#E5EBEE] p-2 text-black text-sm">
                        ←
                    </Link>
                      <div>
                        <div>
                        <span className="font-medium">r/{community?.name}</span> • {timeAgo(post.createdAt)}
                        </div>
                        <div className="font-medium">{author}</div>
                      </div>
                  </div>
                  {/* (...) Menu dropdown */}
                  <Dropdown align="right" trigger={<CircleButton size="10" />}>
                    <DropdownItem>
                      test 1
                    </DropdownItem>
      
                    <DropdownItem onClick={() => console.log("Advertise")}>
                      Advertise with goTalk
                    </DropdownItem>
      
                    <DropdownItem onClick={() => console.log("Pro")}>
                      Try goTalk Pro
                    </DropdownItem>
                  </Dropdown>
              </div>

              {/* Post title */}
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

              {/* Post content */}
              <p className="text-base leading-relaxed mb-4">{post.content}</p>

              {/* Interactions */}
              <div className="flex gap-4 text-gray-600 text-xs h-10" >
                {/* voting */}
                <div className="flex gap-0 bg-[#E5EBEE] items-center rounded-full">
                <PillButton>
                    <ArrowUp />
                </PillButton>
                <span className="">{post.score ?? 0}</span>
                <PillButton>
                    <ArrowDown />
                </PillButton>
                </div>

                <PillButton className="flex items-center gap-1">
                    <div className="flex gap-2  text-xs">
                  <MessageSquare size={18} /> {comments.length}
                  </div>
                </PillButton>
                <PillButton>
                  <div className="flex items-center gap-2 text-xx">
                  <Share2 size={15} /> 
                  <div>Share</div>
                  </div>
                </PillButton>
              </div>
            </PostCardContent>
          </PostCard>

          <div className="w-full relative flex items-center">
            <div className="w-full mx-auto flex justify-start">
              <form
                className={`
                  flex items-center
                  rounded-full
                  border
                  transition-colors duration-150
                  ${isFocused ? "border-[#B4D7FE] ring-[0.5px] ring-white/50 bg-white" : "border bg-white"}
                  hover:bg-gray-100
                  overflow-hidden
                  px-4
                  w-full
                `}
              >
                {/* Input */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Add your reply"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`
                    text-sm
                    flex-1
                    py-2
                    outline-none
                    bg-transparent
                    placeholder-gray-500
                    ${isActive ? "text-left placeholder:text-left" : "text-center placeholder:text-center"}
                  `}
                />

                {/* Button */}
                {/* <button
                  type="submit"
                  className={`
                    px-4
                    py-1
                    rounded-full
                    text-black
                    font-semibold
                    transition-colors duration-150
                  `}
                >
                  Comment
                </button> */}
              </form>
            </div>
          </div>





          {/* Comments section */}
          <div className="flex flex-col gap-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <PostCard key={c.id} className=" rounded-xl">
                  <PostCardContent className="p-0">
                    <div className="flex gap-1 items-center mb-1">
                      <div className="text-sm font-medium">{c.username}</div>
                      <div>•</div>
                      <div className="text-xs text-gray-400">{timeAgo(c.createdAt)}</div>
                    </div>
                    <p>{c.content}</p>
                  </PostCardContent>
                </PostCard>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
