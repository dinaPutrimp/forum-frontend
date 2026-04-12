import useFetch from "./useFetch";

interface Comment {
  id: string;
  content: string;
  owner: string;
}

const useComment = () => {
  const { data, error, execute, loading } = useFetch();

  const createComment = (content: string, threadId: string) =>
    execute<Comment>({
      method: "POST",
      url: `/threads/${threadId}/comments`,
      data: { content },
    });

  const deleteComment = (commentId: string, threadId: string) =>
    execute({
      method: "DELETE",
      url: `/threads/${threadId}/comments/${commentId}`,
    });

  const likeComment = (threadId: string, commentId: string) =>
    execute({
      method: "PUT",
      url: `/threads/${threadId}/comments/${commentId}/likes`,
    });

  return {
    data: data as Comment | null,
    loading,
    error,
    createComment,
    deleteComment,
    likeComment,
  };
};

export default useComment;
