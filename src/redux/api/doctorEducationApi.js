import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const DOCTOR_EDUCATION_URL = "/doctor-educations";

export const doctorEducationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDoctorEducation: build.mutation({
      query: (data) => ({
        url: "/doctor-educations/create-doctor-education",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorEducation],
    }),

    doctorEducations: build.query({
      //@ts-ignore
      query: (arg) => {
        return {
          url: DOCTOR_EDUCATION_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          doctorEducations: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorEducation],
    }),

    SpecificDoctorEducation: build.query({
      //@ts-ignore
      query: (id) => ({
        url: `${DOCTOR_EDUCATION_URL}/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorEducation],
    }),

    doctorEducation: build.query({
      //@ts-ignore
      query: (id) => ({
        url: `${DOCTOR_EDUCATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorEducation],
    }),

    updateDoctorEducation: build.mutation({
      //@ts-ignore
      query: (data) => ({
        url: `${DOCTOR_EDUCATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.doctorEducation],
    }),

    deleteDoctorEducation: build.mutation({
      //@ts-ignore
      query: (id) => ({
        url: `${DOCTOR_EDUCATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorEducation],
    }),
  }),
});

export const {
  useAddDoctorEducationMutation,
  useSpecificDoctorEducationQuery,
  useDoctorEducationQuery,
  useDoctorEducationsQuery,
  useUpdateDoctorEducationMutation,
  useDeleteDoctorEducationMutation,
} = doctorEducationApi;
