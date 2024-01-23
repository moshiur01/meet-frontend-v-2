import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //hook name
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //*update password
    updatePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/updatePassword/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.patient],
    }),
  }),
  overrideExisting: false,
});

export const { useUserLoginMutation, useUpdatePasswordMutation } = authApi;
