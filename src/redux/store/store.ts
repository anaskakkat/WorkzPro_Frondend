import { configureStore } from "@reduxjs/toolkit";
import userSlices from "../slices/userSlices";
import workerSlice from "../slices/workerSlice";

const store = configureStore({
  reducer: {
    userInfo: userSlices,
    workerInfo: workerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
