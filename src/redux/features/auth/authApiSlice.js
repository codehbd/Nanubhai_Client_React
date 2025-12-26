import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Signup
    signup: builder.mutation({
      query: (bodyData) => ({
        url: `/api/user/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: bodyData,
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Login
    login: builder.mutation({
      query: (bodyData) => ({
        url: `/api/user/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: bodyData,
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Google Login
    googleLogin: builder.mutation({
      query: ({credential}) => ({
        url: `/api/user/google`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: { credential },
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Get User Profile
    getUserProfile: builder.query({
      query: (token) => ({
        url: `/api/user`,
        method: "GET",
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),

    // 🔹 Logout
    logout: builder.mutation({
      query: (token) => ({
        url: `/api/user/logout`,
        method: "POST",
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Update Profile
    updateProfile: builder.mutation({
      query: ({ token, formData }) => ({
        url: `/api/user/update-profile`,
        method: "PUT",
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // 🔹 Forgot Password
    forgotPassword: builder.mutation({
      query: (bodyData) => ({
        url: `/api/user/forget-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: bodyData,
      }),
    }),

    // 🔹 Reset Password
    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: `/api/user/reset-password/${token}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useGetUserProfileQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
