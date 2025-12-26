import { apiSlice } from "../apiSlice";

export const shippingAddressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get All Shipping Addresses
    getAllShippingAddresses: builder.query({
      query: (token) => {
        return {
          url: `/api/shipping-address/all`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      providesTags: ["ShippingAddress"],
    }),
    // 🔹 Create Shipping Address
    createShippingAddress: builder.mutation({
      query: ({ token, bodyData }) => {
        return {
          url: `/api/shipping-address/create`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["ShippingAddress"],
    }),
    // 🔹 Update Shipping Address
    updateShippingAddress: builder.mutation({
      query: ({ token, id, bodyData }) => {
        return {
          url: `/api/shipping-address/${id}`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["ShippingAddress"],
    }),
    // 🔹 Delete Shipping Address
    deleteShippingAddress: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/api/shipping-address/${id}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["ShippingAddress"],
    }),
  }),
});

export const {
  useGetAllShippingAddressesQuery,
  useCreateShippingAddressMutation,
  useUpdateShippingAddressMutation,
  useDeleteShippingAddressMutation,
} = shippingAddressApiSlice;
