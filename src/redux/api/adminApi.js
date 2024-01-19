import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admins";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //create admin
    addAdmin: build.mutation({
      query: (data) => ({
        url: "/admins/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    //get all admin data
    admins: build.query({
      query: (arg) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),

    //single admin data
    admin: build.query({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    //update admin data
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    //delete admin data
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useAdminsQuery,
  useAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
