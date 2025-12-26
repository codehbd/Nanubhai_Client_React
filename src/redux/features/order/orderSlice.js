import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderCount: (state, action) => {
      state.count = action.payload.count;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrderCount } = orderSlice.actions;

export default orderSlice.reducer;
