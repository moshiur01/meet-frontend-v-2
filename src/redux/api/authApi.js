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
  }),
  overrideExisting: false,
});

export const { useUserLoginMutation } = authApi;
