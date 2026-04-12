import { useEffect, useMemo, useRef, useState } from "react";
import { colorFromString, getInitial, timeAgo } from "../../utils/converter";
import type { Reply } from "../../types/thread";
import useReply from "../../hooks/useReply";

const ReplyCard = ({
  threadId,
  commentId,
  getThread,
  reply,
}: {
  threadId: string;
  commentId: string;
  getThread: (id: string) => void;
  reply: Reply;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { deleteReply } = useReply();

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    await deleteReply(reply.id, commentId, threadId);
    getThread(threadId);
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

  const initial = useMemo(() => getInitial(reply.username), [reply.username]);
  const avatarBg = useMemo(() => colorFromString(), [initial]);

  return (
    <div className="flex gap-2">
      <div
        style={{ background: avatarBg }}
        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-[#888]"
      >
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-[#c0c0c0]">
              {reply.username}
            </span>
            <span className="text-xs text-[#444]">{timeAgo(reply.date)}</span>
          </div>
          {!reply.is_delete && (
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
          )}
        </div>
        <p className="text-sm text-[#777] leading-relaxed">{reply.content}</p>
      </div>
    </div>
  );
};

export default ReplyCard;
