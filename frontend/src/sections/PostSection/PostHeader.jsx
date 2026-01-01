import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/DropdownMenu/DropdownMenu.jsx";
import { DropdownItem } from "../../components/DropdownMenu/DropdownItem.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

export default function PostHeader({ community, author, createdAt, timeAgo, onEdit, onDelete }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAuthor = user && author?.id === user?.id;

  return (
    <div className="flex justify-between items-center pr-[3px]">
      
      {/* Left side */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          className="rounded-full bg-[rgb(229,235,238)] p-[5px] hover:bg-[#D5DFE3]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <div>
            <span className="font-medium">r/{community?.name}</span> • {timeAgo(createdAt)}
          </div>
          <div className="font-medium">{author}</div>
        </div>
      </div>

      {/* Right Dropdown */}
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
  );
}
