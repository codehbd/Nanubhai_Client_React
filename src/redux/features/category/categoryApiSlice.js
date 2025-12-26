import { apiSlice } from "../apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Single Category
    getSingleCategory: builder.query({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Category"],
    }),

    // Get All Categories
    getAllCategories: builder.query({
      query: () => ({
        url: `/api/category/all`,
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Category"],
    }),

    // Get Flat All Categories
    getFlatAllCategories: builder.query({
      query: () => ({
        url: `/api/category/flat-all`,
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Category"],
    }),

    // Get All Parent Categories
    getAllParentCategories: builder.query({
      query: () => ({
        url: `/api/category/parent/all`,
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Category"],
    }),

    // Get All Child Categories by Parent ID
    getAllChildCategories: builder.query({
      query: ({ id }) => ({
        url: `/api/category/child/all/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Category"],
    }),

    // Get All Discount Categories
    getAllDiscountCategories: builder.query({
      query: () => ({
        url: `/api/category/discounts`,
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetSingleCategoryQuery,
  useGetAllCategoriesQuery,
  useGetFlatAllCategoriesQuery,
  useGetAllParentCategoriesQuery,
  useGetAllChildCategoriesQuery,
  useGetAllDiscountCategoriesQuery,
} = categoryApiSlice;
