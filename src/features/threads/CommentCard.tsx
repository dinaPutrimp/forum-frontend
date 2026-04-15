import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { colorFromString, getInitial, timeAgo } from "../../utils/converter";
import type { CommentSection } from "../../types/thread";
import useComment from "../../hooks/useComment";
import { AuthContext } from "../../contexts/AuthContext";
import useReply from "../../hooks/useReply";
import ReplyCard from "./ReplyCard";

const CommentCard = ({
  getThread,
  threadId,
  comment,
  isLast,
}: {
  getThread: (id: string) => void;
  threadId: string;
  comment: CommentSection;
  isLast: boolean;
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const context = useContext(AuthContext);

  const { likeComment, deleteComment } = useComment();
  const { createReply, loading } = useReply();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    likeComment(threadId, comment.id);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    await deleteComment(comment.id, threadId);
    setLikeCount(0);
    setLiked(false);
    getThread(threadId);
  };

  const handleCreateReply = async () => {
    if (!replyText.trim()) return;
    await createReply(replyText, comment.id, threadId);
    setReplyText("");
    setShowReplyInput(false);
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

  const initial = useMemo(
    () => getInitial(comment.username),
    [comment.username]
  );
  const avatarBg = useMemo(() => colorFromString(), [initial]);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          style={{ background: avatarBg }}
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-[#888]"
        >
          {initial}
        </div>
        {!isLast && <div className="w-px flex-1 bg-[#2e2e2e] mt-2 mb-2" />}
      </div>

      <div className="flex flex-col">
        <div className="flex-1 min-w-0 pb-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-[#c0c0c0]">
                {comment.username}
              </span>
              <span className="text-xs text-[#444]">
                {timeAgo(comment.date)}
              </span>
            </div>

            {!comment?.is_delete && (
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
          <p className="text-sm text-[#777] leading-relaxed">
            {comment.content}
          </p>

          <button
            onClick={handleLike}
            className={`mt-2 flex items-center gap-1 text-xs transition-colors ${
              liked ? "text-[#ff4d6d]" : "text-[#555] hover:text-[#ff4d6d]"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transition: "transform 0.15s ease",
                transform: liked ? "scale(1.2)" : "scale(1)",
              }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {likeCount > 0 ? likeCount : "like"}
          </button>
          <button
            onClick={() => setShowReplyInput((prev) => !prev)}
            className="text-xs text-[#555] hover:text-[#aaa] transition-colors"
          >
            Reply
          </button>
        </div>

        {showReplyInput && (
          <div className="mt-1 mb-1 ml-2">
            <div className="flex items-center gap-2 mb-2">
              <div
                style={{ background: colorFromString() }}
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium text-[#888]"
              >
                {getInitial(context?.user?.username || "")}
              </div>
              <span className="text-xs text-[#888]">
                {context?.user?.username}
              </span>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Tulis balasan..."
              rows={2}
              className="w-full bg-[#1e1e1e] border border-[#2e2e2e] focus:border-[#444] text-sm text-[#e0e0e0] placeholder-[#555] resize-none outline-none leading-relaxed rounded-lg px-3 py-2 transition-colors"
            />

            {replyText.trim() && (
              <div className="flex justify-end mt-2">
                <button
                  disabled={loading}
                  onClick={handleCreateReply}
                  className="px-3 py-1 bg-[#e0e0e0] text-[#141414] text-xs font-semibold rounded-full hover:bg-white transition-colors"
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            )}
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-1 mb-2 ml-2 space-y-3">
            {comment.replies.map((reply) => (
              <ReplyCard
                key={reply.id}
                threadId={threadId}
                commentId={comment.id}
                getThread={getThread}
                reply={reply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
