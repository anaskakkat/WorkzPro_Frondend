import { configureStore } from "@reduxjs/toolkit";
import userSlices from "../slices/userSlices";
import workerSlice from "../slices/workerSlice";
import adminSlice from "../slices/adminSlice";
import ServiceSlice from "../slices/ServiceSlice";
import LocationSlice from "../slices/LocationSlice";
import userBookingSlotReducer from "../slices/userBookingSlot";

const store = configureStore({
  reducer: {
    userInfo: userSlices,
    workerInfo: workerSlice,
    adminInfo: adminSlice,
    services: ServiceSlice,
    location: LocationSlice,
    userBookingSlot: userBookingSlotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;