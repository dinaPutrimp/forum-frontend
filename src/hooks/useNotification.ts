import type { NotificationResponse } from "../types/notification";
import useFetch from "./useFetch";

const useNotification = () => {
  const { data, loading, error, execute } = useFetch();

  const getNotifications = () =>
    execute<NotificationResponse>({ method: "GET", url: "/notifications" });

  const markAsRead = (notifcationId: string) =>
    execute({ method: "PATCH", url: `/notifications/${notifcationId}/read` });

  const markAllAsRead = () =>
    execute({ method: "PATCH", url: "/notifications/read-all" });

  return { data, loading, getNotifications, markAllAsRead, markAsRead, error };
};

export default useNotification;
