import useFetch from "./useFetch";

interface RegisteredUser {
  id: string;
  username: string;
  fullname: string;
}

const useUser = () => {
  const { data, execute, loading } = useFetch();

  const postUser = (fullname: string, username: string, password: string) =>
    execute<RegisteredUser>({
      method: "POST",
      url: "/users",
      data: { fullname, username, password },
    });

  const getUser = () => execute({ method: "GET", url: "/users/me" });

  return { data, loading, postUser, getUser };
};

export default useUser;
