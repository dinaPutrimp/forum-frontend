import { useEffect, useState } from "react";
import useThreads from "../../hooks/useThreads";
import ThreadCard from "./ThreadCard";
import Spinner from "../../components/Spinner";
import type { ThreadsResponse } from "../../types/thread";

const Threads = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { createThread, data, getThreads, loading } = useThreads();
  const threadsResponse = data as ThreadsResponse | null;

  useEffect(() => {
    getThreads();
  }, []);

  const handlePostThread = async () => {
    if (!title.trim()) return;
    await createThread(title, body);
    setTitle("");
    setBody("");
    getThreads();
  };

  return (
    <div className="min-h-screen flex-1 p-3 sm:p-6 bg-[#141414]">
      <p className="text-xl font-semibold mb-4">Threads</p>

      <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#2a2a2a]">
          <p className="text-[#e0e0e0] text-sm">Create thread</p>
        </div>

        <div className="p-4 sm:p-5">
          <input
            type="text"
            placeholder="Thread title..."
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-[#e0e0e0] text-base outline-none placeholder-[#555] mb-3"
          />
          <textarea
            placeholder="Share your thoughts..."
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full bg-transparent text-[#e0e0e0] text-base outline-none placeholder-[#555] resize-none"
          />
        </div>

        <div className="px-4 sm:px-5 py-3 border-t border-[#2a2a2a] flex items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-[#555] truncate">
            {100 - title.length} characters remaining
          </span>
          <button
            disabled={loading}
            className="bg-[#E8FF47] text-[#111] rounded-full px-4 sm:px-5 py-2 text-sm font-medium hover:bg-[#d4eb3a] transition-colors disabled:opacity-50 whitespace-nowrap flex-shrink-0"
            onClick={handlePostThread}
          >
            Post
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 space-y-3">
        {loading && <Spinner />}
        {!loading &&
          threadsResponse?.data.threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
      </div>
    </div>
  );
};

export default Threads;
