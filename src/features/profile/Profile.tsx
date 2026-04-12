import { useNavigate } from "react-router-dom";
import { colorFromString, getInitial } from "../../utils/converter";
import useThreads from "../../hooks/useThreads";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import type { ThreadsResponse } from "../../types/thread";
import ThreadItem from "../threads/ThreadItem";
import Spinner from "../../components/Spinner";

interface UserProfile {
  username: string;
  fullname: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const { data, getOwnThreads, loading } = useThreads();

  useEffect(() => {
    getOwnThreads();
  }, []);

  const threadsResponse = data as ThreadsResponse | null;

  const profile = context?.user as UserProfile;
  const avatarStyle = colorFromString();

  if (loading) return <Spinner />;

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
        <span className="text-sm font-medium text-[#888]">Profile</span>
      </div>

      <div className="px-5 py-8 border-b border-[#222] flex items-center gap-5">
        <div
          style={{ background: avatarStyle }}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
        >
          {getInitial(profile.username)}
        </div>

        <div>
          <h1 className="text-lg font-semibold text-[#f0f0f0] leading-snug">
            {profile.fullname}
          </h1>
          <p className="text-sm text-[#555] mt-0.5">@{profile.username}</p>
        </div>
      </div>

      <div>
        <p className="px-5 py-3 text-xs text-[#444] font-medium uppercase tracking-wider border-b border-[#222]">
          Threads · {threadsResponse?.data.threads.length}
        </p>

        {threadsResponse?.data.threads.length === 0 ? (
          <div className="px-5 py-16 text-center text-sm text-[#444]">
            Belum ada thread
          </div>
        ) : (
          threadsResponse?.data.threads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
