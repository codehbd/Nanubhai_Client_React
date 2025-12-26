import { createSlice } from "@reduxjs/toolkit";

// Helper to load wishlist from localStorage
const loadWishlist = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// Helper to save wishlist to localStorage
const saveWishlist = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }
};

const initialState = {
  items: loadWishlist(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Clear all wishlist items
    clearWishlist: (state) => {
      state.items = [];
      saveWishlist(state.items);
    },

    // Add a single item to the wishlist
    addWishlistItem: (state, action) => {
      // Avoid duplicates
      const exists = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (!exists) {
        state.items.push(action.payload);
        saveWishlist(state.items);
      }
    },

    // Remove a single item from the wishlist
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
      saveWishlist(state.items);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWishlistItem, removeWishlistItem, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
