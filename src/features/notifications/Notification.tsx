import { useNavigate } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import useNotification from "../../hooks/useNotification";
import { useEffect } from "react";
import type { NotificationResponse } from "../../types/notification";
import Spinner from "../../components/Spinner";

const Notification = () => {
  const navigate = useNavigate();
  const { data, getNotifications, markAllAsRead, markAsRead, loading } =
    useNotification();

  useEffect(() => {
    getNotifications();
  }, []);

  const notifResponse = (data as NotificationResponse) || null;
  const notifications = notifResponse?.data.notifications ?? [];

  const handleMarkAsRead = async (
    e: React.MouseEvent,
    notificationId: string
  ) => {
    e.stopPropagation();
    await markAsRead(notificationId);
    getNotifications();
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    getNotifications();
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#e0e0e0]">
      <div className="sticky flex justify-between items-center top-0 z-20 bg-[#141414]/80 backdrop-blur border-b border-[#222] px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-xl text-[#666] hover:text-[#e0e0e0] hover:bg-[#2a2a2a] transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-[#888]">Notifications</span>
        </div>
        <button
          disabled={loading}
          onClick={handleMarkAllAsRead}
          className="text-xs text-[#555] hover:text-[#aaa] transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4 py-5">
        {loading && <Spinner />}
        {!loading &&
          notifications.map((notification) => (
            <div className="mb-4">
              <NotificationCard
                notification={notification}
                onRead={handleMarkAsRead}
              />
            </div>
          ))}
        {!notifications?.length && (
          <div className="min-h-screen flex items-center justify-center">
            Notifikasi tidak ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
