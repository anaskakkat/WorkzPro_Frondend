import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

// Helper function to format dates like WhatsApp
export const formatDateForChat = (timestamp: string) => {
  const date = new Date(timestamp);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d");
};

// Helper function to format time like "1 hour ago"
export const formatTimeForChat = (timestamp: string) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};
