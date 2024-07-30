import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo") as string)
    : null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setadminInfo: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    removeadminInfo: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { setadminInfo, removeadminInfo } = adminSlice.actions;
export default adminSlice.reducer;
