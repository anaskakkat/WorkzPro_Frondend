// src/redux/slices/servicesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceType {
  name: string;
  description: string;
  isBlocked: boolean;
}

export interface ServicesState {
  services: ServiceType[];
}

const initialState: ServicesState = {
  services: [],
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<ServiceType[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
