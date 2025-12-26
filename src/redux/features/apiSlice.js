import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../storage/local-storage";
const BaseURL =
  import.meta.env.VITE_API_URL || "https://backend.nanuvaierrosonakothon.com";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Category",
    "Cart",
    "Shipping",
    "Order",
    "ShippingAddress",
  ],
  endpoints: () => ({}),
});
