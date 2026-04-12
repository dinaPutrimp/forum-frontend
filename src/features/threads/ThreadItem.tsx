import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/converter";

interface Thread {
  id: string;
  title: string;
  body: string;
  username: string;
  date: string;
}

const ThreadItem = ({ thread }: { thread: Thread }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/threads/${thread.id}`)}
      className="flex gap-3 px-5 py-4 border-b border-[#222] cursor-pointer hover:bg-[#1a1a1a] transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-[#e0e0e0] leading-snug mb-1">
          {thread.title}
        </p>
        <p className="text-sm text-[#666] leading-relaxed line-clamp-2 mb-2">
          {thread.body}
        </p>
        <span className="text-xs text-[#444]">{timeAgo(thread.date)}</span>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#444"
        strokeWidth="2"
        className="flex-shrink-0 mt-1"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
};

export default ThreadItem;
