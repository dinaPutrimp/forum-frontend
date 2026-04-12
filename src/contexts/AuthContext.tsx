import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Dispatch, SetStateAction } from "react";
import useFetch from "../hooks/useFetch";

interface User {
  id: string;
  username: string;
  fullname: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { execute } = useFetch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("user");

      if (!token) {
        setLoading(false);
        return;
      }

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem("user"); // ← hapus kalau corrupt
        }
        setLoading(false);
        return;
      }

      try {
        const result = await execute<{ data: { user: User } }>({
          method: "GET",
          url: "/users/me",
        });

        setUser(result.data.user);
        localStorage.setItem("user", JSON.stringify(result.data.user));
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
