import { apiSlice } from "../apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get All Cart Items
    getAllCart: builder.query({
      query: ({ userId, guestId }) => ({
        url: `/api/cart/all?guestId=${guestId || ""}&userId=${userId || ""}`,
        method: "GET",
        headers: {
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Cart"],
    }),

    // 🔹 Add to Cart
    addToCart: builder.mutation({
      query: (bodyData) => ({
        url: `/api/cart/add`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: bodyData,
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 Change Cart Quantity
    changeQuantityCart: builder.mutation({
      query: ({ id, bodyData }) => ({
        url: `/api/cart/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: bodyData,
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 Delete Single Cart Item
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/api/cart/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 Clear Entire Cart
    clearCart: builder.mutation({
      query: ({ userId, guestId }) => ({
        url: `/api/cart/clear?userId=${userId || ""}&guestId=${guestId || ""}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 Merge Guest Cart into User Cart
    mergeGuestCart: builder.mutation({
      query: (bodyData) => ({
        url: `/api/cart/merge`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: bodyData,
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 Apply Coupon to Cart (requires token)
    applyCouponToCart: builder.mutation({
      query: ({ token, bodyData }) => ({
        url: `/api/cart/apply-coupon`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: bodyData,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetAllCartQuery,
  useAddToCartMutation,
  useChangeQuantityCartMutation,
  useDeleteCartMutation,
  useClearCartMutation,
  useMergeGuestCartMutation,
  useApplyCouponToCartMutation,
} = cartApiSlice;
