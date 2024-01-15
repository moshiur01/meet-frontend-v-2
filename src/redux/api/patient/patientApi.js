import { tagTypes } from "../../tagTypes";
import { baseApi } from "../baseApi";

const PATIENT_URL = "/patients";

const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //create a new patient data
    addPatient: build.mutation({
      query: (data) => ({
        url: "/patients/create-patient",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.patient],
    }),

    //get single patient
    patient: build.query({
      query: (id) => ({
        url: `${PATIENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patient],
    }),

    //update patient data

    updatePatient: build.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.patient],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePatientQuery,
  useAddPatientMutation,
  useUpdatePatientMutation,
} = patientApi;
