export const getInitial = (username: string) =>
  username.charAt(0).toUpperCase();

export const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const colorFromString = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
