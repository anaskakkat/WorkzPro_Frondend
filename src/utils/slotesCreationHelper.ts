import { addMinutes, isBefore, startOfDay } from "date-fns";

export const formatTimeSlot = (slot: string) => {
  const [start, end] = slot.split(" - ");
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  };
  return `${formatTime(start)} - ${formatTime(end)}`;
};

export const calculateNextSlot = (
  current: Date,
  slotDuration: number,
  bufferTime: number
) => {
  const nextSlot = addMinutes(current, slotDuration);
  const bufferEnd = addMinutes(nextSlot, bufferTime);
  return { nextSlot, bufferEnd };
};

export const getStartAndEndTimes = (selectDate: Date, workingHours: any) => {
  const start = addMinutes(
    startOfDay(selectDate),
    parseTime(workingHours.start)
  );
  const end = addMinutes(startOfDay(selectDate), parseTime(workingHours.end));
  return { start, end };
};

export const isSlotWithinWorkingHours = (nextSlot: Date, end: Date) => {
  return isBefore(nextSlot, end);
};

export const parseTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};


