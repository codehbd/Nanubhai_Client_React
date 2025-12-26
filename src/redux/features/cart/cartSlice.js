import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart;
      state.items = action.payload.items;
    },
    clearCart: (state) => {
      state.cart = null;
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
