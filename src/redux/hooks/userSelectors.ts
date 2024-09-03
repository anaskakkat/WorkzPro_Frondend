import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useUserId = () => {
  return useSelector((state: RootState) => state.userInfo.userInfo._id);
};
export const useUserDeatils = () => {
  return useSelector((state: RootState) => state.userInfo.userInfo);
};
export const useWorkerId = () => {
  return useSelector((state: RootState) => state.workerInfo.workerInfo._id);
};
export const useTimeSlots = () => {
  return useSelector((state: RootState) => state.userBookingSlot.timeSlots);
};

export const useSelectedSlot = () => {
  return useSelector((state: RootState) => state.userBookingSlot.selectedSlot);
};

export const useSelectedService = () => {
  return useSelector(
    (state: RootState) => state.userBookingSlot.selectedService
  );
};
