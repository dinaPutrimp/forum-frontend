import type { Notification } from "../../types/notification";

const NotificationCard = ({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (e: React.MouseEvent, id: string) => void;
}) => {
  const getInitial = (username: string) => username.charAt(0).toUpperCase();

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const isReply = notification.type === "reply";

  return (
    <div
      onClick={(e) => onRead(e, notification.id)}
      className={`flex gap-3 p-4 border-b border-[#2a2a2a] rounded-xl cursor-pointer transition-colors ${
        !notification.is_read
          ? "bg-[#1e1e1e] hover:bg-[#222]"
          : "hover:bg-[#1e1e1e]"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-[#D4E9FF] flex items-center justify-center text-sm font-medium text-[#185FA5]">
          {getInitial(notification.actor_username)}
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E8FF47] flex items-center justify-center border-2 border-[#1a1a1a]">
          {isReply ? (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#111">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          ) : (
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111"
              strokeWidth="3"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-sm font-medium text-[#e0e0e0]">
            {notification.actor_username}
          </span>
          <span className="text-xs text-[#555]">
            {timeAgo(notification.created_at)}
          </span>
        </div>
        <p className="text-sm text-[#888] leading-relaxed">
          {isReply ? "replied to your thread" : "liked your comment"}
        </p>
      </div>

      {!notification.is_read && (
        <div className="w-2 h-2 rounded-full bg-[#E8FF47] flex-shrink-0 mt-1.5" />
      )}
    </div>
  );
};

export default NotificationCard;
