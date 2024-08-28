import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceData } from "../../types/IWorker";

export interface UserBookingSlotState {
  timeSlots: string | null;
  selectedSlot: string | null;
  selectedService: ServiceData | null;
}

const initialState: UserBookingSlotState = {
  timeSlots: null,
  selectedSlot: null,
  selectedService: null,
};

const userBookingSlotSlice = createSlice({
  name: "userBookingSlot",
  initialState,
  reducers: {
    setTimeSlotsUser(state, action: PayloadAction<string | null>) {
      state.timeSlots = action.payload;
    },
    setSelectedSlotsUser(state, action: PayloadAction<string | null>) {
      state.selectedSlot = action.payload;
    },
    setSelectedServicesUser(state, action: PayloadAction<ServiceData | null>) {
      state.selectedService = action.payload;
    },
  },
});

export const {
  setTimeSlotsUser,
  setSelectedSlotsUser,
  setSelectedServicesUser,
} = userBookingSlotSlice.actions;
export default userBookingSlotSlice.reducer;
