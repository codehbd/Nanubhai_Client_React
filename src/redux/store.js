import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./features/apiSlice";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cart/cartSlice";
import orderSlice from "./features/order/orderSlice";
import locationSlice from "./features/location/locationSlice";
import wishlistSlice from "./features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    order: orderSlice,
    location: locationSlice,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
  //   devTools: false,
});
setupListeners(store.dispatch);
