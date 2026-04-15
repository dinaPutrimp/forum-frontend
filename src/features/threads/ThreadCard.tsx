import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { colorFromString, getInitial, timeAgo } from "../../utils/converter";
import type { ThreadSummary } from "../../types/thread";

const ThreadCard = ({ thread }: { thread: ThreadSummary }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    alert(`Delete thread: ${thread.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = useMemo(() => getInitial(thread.username), [thread.username]);
  const avatarBg = useMemo(() => colorFromString(), [initial]);

  return (
    <div
      onClick={() => navigate(`/threads/${thread.id}`)}
      className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl p-5 cursor-pointer hover:border-[#444] transition-colors"
    >
      <div className="flex gap-3">
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            style={{ background: avatarBg }}
            className="w-9 h-9 rounded-full bg-[#D4E9FF] flex items-center justify-center text-sm font-medium text-[#185FA5]"
          >
            {initial}
          </div>
          <div className="w-px flex-1 bg-[#2e2e2e] mt-2 min-h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-[#e0e0e0]">
              {thread.username}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#555]">
                {timeAgo(thread.date)}
              </span>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={handleMenuToggle}
                  className="flex items-center justify-center w-6 h-6 rounded-md text-[#555] hover:text-[#aaa] hover:bg-[#2a2a2a] transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-8 z-10 bg-[#252525] border border-[#333] rounded-xl shadow-xl overflow-hidden w-36">
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-[#ff6b6b] hover:bg-[#2e2e2e] transition-colors"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-[15px] font-medium text-[#e0e0e0] mb-1 leading-snug">
            {thread.title}
          </p>

          <p className="text-sm text-[#888] leading-relaxed mb-3 line-clamp-2">
            {thread.body}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <button className="flex items-center gap-1.5 text-[#666] text-xs hover:text-[#E8FF47] transition-colors">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {thread.comment_count} replies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
