import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const MEDICINE_URL = "/medicines";

const medicineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //*get all medicine  data
    allMedicines: build.query({
      //@ts-ignore
      query: (arg) => {
        return {
          url: MEDICINE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          medicines: response,
          meta,
        };
      },
      providesTags: [tagTypes.medicine],
    }),

    //*get single medicine  data
    medicine: build.query({
      query: (id) => ({
        url: `${MEDICINE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.medicine],
    }),

    //*update medicine man data
    updateMedicine: build.mutation({
      query: (data) => ({
        url: `${MEDICINE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.medicine],
    }),

    //*delete medicine man data
    deleteMedicine: build.mutation({
      //@ts-ignore
      query: (id) => ({
        url: `${MEDICINE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.medicine],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAllMedicinesQuery,
  useMedicineQuery,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = medicineApi;
