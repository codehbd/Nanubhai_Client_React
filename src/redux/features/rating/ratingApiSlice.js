import { apiSlice } from "../apiSlice";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get Single Product Ratings
    getSingleProductRatings: builder.query({
      query: ({ id, page = 1, limit = 5 }) => ({
        url: `/api/rating/${id}?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Rating"],
    }),

    // 🔹 Create Rating
    createRating: builder.mutation({
      query: ({ token, bodyData }) => ({
        url: `/api/rating/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: bodyData,
      }),
      invalidatesTags: ["Rating"],
    }),
  }),
});

export const { useGetSingleProductRatingsQuery, useCreateRatingMutation } =
  ratingApiSlice;
