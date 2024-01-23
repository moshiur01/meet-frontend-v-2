import { tagTypes } from "../../tagTypes";
import { baseApi } from "../baseApi";

const PATIENT_URL = "/patients";

const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //*create a new patient data
    addPatient: build.mutation({
      query: (data) => ({
        url: "/patients/create-patient",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.patient],
    }),

    //*get all patient data
    patients: build.query({
      //@ts-ignore
      query: (arg) => {
        return {
          url: PATIENT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          patients: response,
          meta,
        };
      },
      providesTags: [tagTypes.patient],
    }),

    //*get single patient
    patient: build.query({
      query: (id) => ({
        url: `${PATIENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patient],
    }),

    //*update patient data
    updatePatient: build.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.patient],
    }),

    //*update patient password
    updatePatientPassword: build.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/updatePassword/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.patient],
    }),

    deletePatient: build.mutation({
      //@ts-ignore
      query: (id) => ({
        url: `${PATIENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.patient],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePatientQuery,
  usePatientsQuery,
  useAddPatientMutation,
  useUpdatePatientMutation,
  useUpdatePatientPasswordMutation,
  useDeletePatientMutation,
} = patientApi;
