import { tagTypes } from "../../tagTypes";
import { baseApi } from "../baseApi";

const PATIENT_URL = "/patients";

const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //hook name
    patient: build.query({
      query: (id) => ({
        url: `${PATIENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patient],
    }),
  }),
  overrideExisting: false,
});

export const { usePatientQuery } = patientApi;
