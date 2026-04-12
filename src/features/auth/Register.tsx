import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();
  const { postUser, loading } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postUser(fullname, username, password);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#e0e0e0] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-2xl font-semibold mb-1">Create an account</p>
        <p className="text-sm text-[#555] mb-8">Join the conversation.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Fullname</label>
            <input
              type="text"
              placeholder="Your fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-[#e0e0e0] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Username</label>
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-[#e0e0e0] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl px-4 py-2.5 text-sm text-[#e0e0e0] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full py-2.5 bg-[#E8FF47] text-[#111] text-sm font-semibold rounded-xl hover:bg-[#d4eb3a] transition-colors mt-2 flex items-center justify-center gap-2"
          >
            {loading && (
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
            )}{" "}
            Register
          </button>
        </form>

        <p className="text-xs text-[#555] text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#e0e0e0] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
