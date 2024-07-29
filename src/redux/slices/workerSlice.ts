import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workerInfo: localStorage.getItem("workerInfo")
    ? JSON.parse(localStorage.getItem("workerInfo") as string)
    : null,
};

const userSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    setWorkerInfo: (state, action) => {
      state.workerInfo = action.payload;
      localStorage.setItem("workerInfo", JSON.stringify(action.payload));
    },
    removeWorkerInfo: (state) => {
      state.workerInfo = null;
      localStorage.removeItem("workerInfo");
    },
  },
});

export const { setWorkerInfo, removeWorkerInfo } = userSlice.actions;
export default userSlice.reducer;
