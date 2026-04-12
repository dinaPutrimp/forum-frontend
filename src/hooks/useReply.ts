import useFetch from "./useFetch";

interface Reply {
  id: string;
  content: string;
  owner: string;
}

const useReply = () => {
  const { data, error, execute, loading } = useFetch();

  const createReply = (content: string, commentId: string, threadId: string) =>
    execute<Reply>({
      method: "POST",
      url: `/threads/${threadId}/comments/${commentId}/replies`,
      data: { content },
    });

  const deleteReply = (replyId: string, commentId: string, threadId: string) =>
    execute({
      method: "DELETE",
      url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
    });

  return {
    data: data as Reply | null,
    loading,
    error,
    createReply,
    deleteReply,
  };
};

export default useReply;
