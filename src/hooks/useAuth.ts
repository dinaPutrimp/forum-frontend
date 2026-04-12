import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useFetch from "./useFetch";

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface UserResponse {
  data: {
    user: {
      id: string;
      username: string;
      fullname: string;
    };
  };
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { execute, loading } = useFetch();

  const login = async (username: string, password: string) => {
    const result = await execute<LoginResponse>({
      method: "POST",
      url: "/authentications",
      data: { username, password },
    });

    localStorage.setItem("accessToken", result?.data.accessToken);
    localStorage.setItem("refreshToken", result?.data.refreshToken);

    const userResponse = await execute<UserResponse>({
      method: "GET",
      url: "/users/me",
    });
    const user = userResponse?.data?.user;
    localStorage.setItem("user", JSON.stringify(user));
    context.setUser({
      id: user.id,
      username: user.username,
      fullname: user.fullname,
    });
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    await execute({
      method: "DELETE",
      url: "/authentications",
      data: { refreshToken },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    context.setUser(null);
  };

  return { login, logout, loading };
};

export default useAuth;
