import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const SPECIALIZATION_URL = "/specializations";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    specializations: build.query({
      query: (arg) => ({
        url: SPECIALIZATION_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta) => {
        return {
          specializations: response,
          meta,
        };
      },
      providesTags: [tagTypes.specialization],
    }),

    addSpecialization: build.mutation({
      query: (data) => ({
        url: "/specializations/create-specialization",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.specialization],
    }),

    specialization: build.query({
      query: (id) => ({
        url: `${SPECIALIZATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.specialization],
    }),

    updateSpecialization: build.mutation({
      query: (data) => ({
        url: `${SPECIALIZATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.specialization],
    }),

    deleteSpecialization: build.mutation({
      query: (id) => ({
        url: `${SPECIALIZATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialization],
    }),
  }),
});

export const {
  useAddSpecializationMutation,
  useDeleteSpecializationMutation,
  useSpecializationQuery,
  useSpecializationsQuery,
  useUpdateSpecializationMutation,
} = specializationApi;
