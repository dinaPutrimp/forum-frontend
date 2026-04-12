import type { Thread, ThreadResponse, ThreadsResponse } from "../types/thread";
import useFetch from "./useFetch";

const useThreads = () => {
  const { data, error, execute, loading } = useFetch();

  const getThreads = () =>
    execute<ThreadsResponse[]>({ method: "GET", url: "/threads" });

  const createThread = (title: string, body: string) =>
    execute<Thread>({ method: "POST", url: "/threads", data: { title, body } });

  const getThread = (id: string) =>
    execute<ThreadResponse>({ method: "GET", url: `/threads/${id}` });

  const getOwnThreads = () =>
    execute<ThreadsResponse[]>({ method: "GET", url: "/threads/me" });

  return {
    data: data as ThreadResponse | ThreadResponse[] | null,
    loading,
    error,
    getThreads,
    createThread,
    getThread,
    getOwnThreads,
  };
};

export default useThreads;
