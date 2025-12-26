import { apiSlice } from "../apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Create Order
    createOrder: builder.mutation({
      query: ({ token, bodyData }) => ({
        url: `/api/order/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: bodyData,
      }),
      invalidatesTags: ["Order", "Cart"], // typically clears cart after order creation
    }),

    // 🔹 Get My Orders
    getMyOrders: builder.query({
      query: ({ token, page = 1, limit = 5, status = "all", search = "" }) => ({
        url: `/api/order/myorder?page=${page}&limit=${limit}&status=${status}&search=${search}`,
        method: "GET",
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApiSlice;
