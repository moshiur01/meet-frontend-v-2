import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const DOCTOR_EXPERIENCE_URL = "/doctor-experiences";

export const doctorExperienceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDoctorExperience: build.mutation({
      query: (data) => ({
        url: "/doctor-experiences/create-doctor-experience",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorExperience],
    }),

    doctorExperiences: build.query({
      query: (arg) => {
        return {
          url: DOCTOR_EXPERIENCE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          doctorExperiences: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorExperience],
    }),

    SpecificDoctorExperience: build.query({
      query: (id) => ({
        url: `${DOCTOR_EXPERIENCE_URL}/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorExperience],
    }),

    doctorExperience: build.query({
      query: (id) => ({
        url: `${DOCTOR_EXPERIENCE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorExperience],
    }),

    updateDoctorExperience: build.mutation({
      query: (data) => ({
        url: `${DOCTOR_EXPERIENCE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.doctorExperience],
    }),

    deleteDoctorExperience: build.mutation({
      query: (id) => ({
        url: `${DOCTOR_EXPERIENCE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorExperience],
    }),
  }),
});

export const {
  useAddDoctorExperienceMutation,
  useSpecificDoctorExperienceQuery,
  useDoctorExperienceQuery,
  useDoctorExperiencesQuery,
  useUpdateDoctorExperienceMutation,
  useDeleteDoctorExperienceMutation,
} = doctorExperienceApi;
