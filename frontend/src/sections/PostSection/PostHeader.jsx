import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function PostHeader({
  community,
  author,
  authorId,
  createdAt,
  timeAgo,
  onEdit,
  onDelete,
  isAuthor,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="w-full flex justify-between items-center">
      
      {/* Left side */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          className="rounded-full bg-[rgb(229,235,238)] p-[5px] hover:bg-[#D5DFE3]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col">
          <div>
            {/* Clickable community name */}
            <span
              onClick={() => navigate(`/communities/${community?.id}`)}
              className="font-medium hover:underline cursor-pointer"
            >
              r/{community?.name}
            </span>{" "}
            • {timeAgo(createdAt)}
          </div>
          {/* Clickable author name */}
          <div
            onClick={() => navigate(`/users/${authorId}`)}
            className="font-medium hover:underline cursor-pointer"
          >
            {author?.username || "Unknown"}
          </div>
        </div>
      </div>

      {/* Right Dropdown */}
      <div>
        <Dropdown align="right" trigger={<CircleButton size="8" />}>
          {/* If user is author → show edit/delete */}
          {isAuthor ? (
            <>
              <DropdownItem onClick={onEdit}>Edit Post</DropdownItem>
              <DropdownItem onClick={onDelete}>Delete Post</DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem>Advertise with goTalk</DropdownItem>
              <DropdownItem>Try goTalk Pro</DropdownItem>
            </>
          )}
        </Dropdown>
      </div>
    </div>
  );
}
