import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { colorFromString, getInitial, timeAgo } from "../../utils/converter";
import useThreads from "../../hooks/useThreads";
import Spinner from "../../components/Spinner";
import CommentCard from "./CommentCard";
import { AuthContext } from "../../contexts/AuthContext";
import useComment from "../../hooks/useComment";
import type { ThreadResponse } from "../../types/thread";

const ThreadDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const context = useContext(AuthContext);

  const { data, getThread, loading } = useThreads();
  const { createComment, loading: commentLoading } = useComment();

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [commentText]);

  useEffect(() => {
    if (id) getThread(id);
  }, [id]);

  if (loading) return <Spinner />;

  const thread = (data as ThreadResponse)?.data?.thread || null;
  if (!thread)
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        Thread tidak ditemukan.
      </div>
    );

  const comments = thread?.comments ?? [];
  const avatarStyle = colorFromString();

  const handleSubmitReply = async () => {
    if (!commentText.trim()) return;
    await createComment(commentText, thread.id);
    setCommentText("");
    getThread(thread.id);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#e0e0e0]">
      <div className="sticky top-0 z-20 bg-[#141414]/80 backdrop-blur border-b border-[#222] px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 rounded-xl text-[#666] hover:text-[#e0e0e0] hover:bg-[#2a2a2a] transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-[#888]">Post</span>
      </div>

      <div className="max-w-xl mx-auto px-4 py-5">
        <div className="flex gap-3 mb-6">
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              style={{ background: avatarStyle }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
            >
              {getInitial(thread.username)}
            </div>
            {comments.length > 0 && (
              <div className="w-px flex-1 bg-[#2a2a2a] mt-2" />
            )}
          </div>

          <div className="flex-1 min-w-0 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-[#e0e0e0]">
                {thread.username}
              </span>
              <span className="text-xs text-[#444]">
                {timeAgo(thread.date)}
              </span>
            </div>

            <h1 className="text-xl font-semibold text-[#f0f0f0] leading-snug mb-3">
              {thread.title}
            </h1>

            <p className="text-[15px] text-[#888] leading-relaxed mb-4">
              {thread.body}
            </p>

            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1.5 text-[#555] text-sm hover:text-[#E8FF47] transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {comments.length} comments
              </button>
            </div>
          </div>
        </div>

        {comments.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-[#444] font-medium uppercase tracking-wider mb-4">
              {comments.length} Comments
            </p>
            {comments.map((comment, index) => (
              <CommentCard
                key={comment.id}
                getThread={getThread}
                threadId={thread.id}
                comment={comment}
                isLast={index === comments.length - 1}
              />
            ))}
          </div>
        )}

        <div className="border-t border-[#222] mb-5" />

        <div className="flex gap-3">
          <div className="flex-shrink-0 pt-1">
            <div
              style={{ background: colorFromString() }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
            >
              {getInitial(context?.user?.username || "")}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Tulis balasan..."
              rows={1}
              className="w-full bg-transparent text-sm text-[#e0e0e0] placeholder-[#444] resize-none outline-none leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                  handleSubmitReply();
              }}
            />
            {commentText.trim() && (
              <div className="flex justify-end mt-3">
                <button
                  disabled={loading || commentLoading}
                  onClick={handleSubmitReply}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e0e0e0] text-[#141414] text-sm font-semibold rounded-full hover:bg-white transition-colors"
                >
                  {commentLoading && (
                    <svg
                      className="animate-spin w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  )}
                  Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
