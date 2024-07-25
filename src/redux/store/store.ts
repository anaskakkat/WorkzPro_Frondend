import { configureStore } from "@reduxjs/toolkit";
import userSlices from "../slices/userSlices";

const store = configureStore({
  reducer: {
    userInfo: userSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
