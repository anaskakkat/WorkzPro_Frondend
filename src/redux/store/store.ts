import { configureStore } from "@reduxjs/toolkit";
import userSlices from "../slices/userSlices";
import workerSlice from "../slices/workerSlice";
import adminSlice from "../slices/adminSlice";
import ServiceSlice from "../slices/ServiceSlice";

const store = configureStore({
  reducer: {
    userInfo: userSlices,
    workerInfo: workerSlice,
    adminInfo: adminSlice,
    services:ServiceSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
