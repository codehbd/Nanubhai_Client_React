import { apiSlice } from "../apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get All Products
    getProducts: builder.query({
      query: ({ location, type, name, page = 1, limit = 5, category }) => ({
        url: `/api/product/all?location=${location || ""}&type=${
          type || ""
        }&name=${name || ""}&category=${
          category || ""
        }&page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Product"],
    }),

    // 🔹 Get Single Product
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "GET",
        headers: {
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } =
  productApiSlice;
