type NotificationPayload =
  | {
      threadId: string;
      thread_title: string;
    }
  | {
      threadId: string;
      thread_title: string;
      commentId: string;
      comment_preview: string;
    }
  | {
      threadId: string;
      thread_title: string;
      commentId: string;
      replyId: string;
      comment_preview: string;
    };

export interface Notification {
  id: string;
  type: "reply" | "like";
  entity_type: "comment" | "reply";
  actor_username: string;
  payload: NotificationPayload;
  is_read: boolean;
  created_at: string;
}

export interface NotificationResponse {
  data: { notifications: Notification[] };
}
