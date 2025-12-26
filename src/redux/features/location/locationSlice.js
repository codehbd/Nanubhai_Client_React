import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLocation: "",
  isLocationModalOpen: false,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.currentLocation = action.payload.currentLocation;
    },
    openLocationModal: (state) => {
      state.isLocationModalOpen = true;
    },
    closeLocationModal: (state) => {
      state.isLocationModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation, openLocationModal, closeLocationModal } =
  locationSlice.actions;

export default locationSlice.reducer;
