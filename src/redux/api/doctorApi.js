import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const DOCTOR_URL = "/doctors";

export const DoctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDoctor: build.mutation({
      query: (data) => ({
        url: "/doctors/create-doctor",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),

    doctors: build.query({
      //@ts-ignore
      query: (arg) => {
        return {
          url: DOCTOR_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctor],
    }),

    doctor: build.query({
      //@ts-ignore
      query: (id) => ({
        url: `${DOCTOR_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctor],
    }),

    updateDoctor: build.mutation({
      //@ts-ignore
      query: (data) => ({
        url: `${DOCTOR_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    deleteDoctor: build.mutation({
      //@ts-ignore
      query: (id) => ({
        url: `${DOCTOR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
  }),
});

export const {
  useAddDoctorMutation,
  useDoctorsQuery,
  useDoctorQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = DoctorApi;
