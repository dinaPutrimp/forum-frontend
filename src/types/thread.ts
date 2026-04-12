export interface Reply {
  id: string;
  content: string;
  username: string;
  date: string;
  is_delete: boolean;
}

export interface Comment {
  id: string;
  content: string;
  username: string;
  date: string;
  is_delete: boolean;
}

export interface CommentSection {
  id: string;
  content: string;
  username: string;
  date: string;
  is_delete: boolean;
  likeCount: number;
  replies?: Reply[];
}

export interface Thread {
  id: string;
  title: string;
  body: string;
  username: string;
  date: string;
  comments?: CommentSection[];
}

export interface ThreadSummary {
  id: string;
  title: string;
  body: string;
  username: string;
  date: string;
  comment_count?: number;
}

export interface ThreadResponse {
  data: { thread: Thread };
}

export interface ThreadsResponse {
  data: { threads: Thread[] };
}
