import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  type: string;
  coordinates: number[];
}

const initialState: LocationState = {
  type: "Point",
  coordinates: [0, 0],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationState(state, action: PayloadAction<LocationState>) {
      return action.payload;
    },
  },
}); 

export const { setLocationState } = locationSlice.actions; 
export default locationSlice.reducer;
