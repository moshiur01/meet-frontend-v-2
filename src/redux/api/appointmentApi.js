import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const APPOINTMENT_URL = "/appointments";

export const AppointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bookAppointment: build.mutation({
      query: (data) => ({
        url: "/appointments/book-appointment",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.patientBookAppointment],
    }),

    getAllAppointments: build.query({
      query: (arg) => {
        return {
          url: APPOINTMENT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          appointments: response,
          meta,
        };
      },
      providesTags: [tagTypes.patientBookAppointment],
    }),

    // doctorService: build.query({
    //   query: (id) => ({
    //     url: `${DOCTOR_SERVICE_URL}/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.doctorService],
    // }),

    singleAppointment: build.query({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patientBookAppointment],
    }),

    getPatientAppointment: build.query({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/patient/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patientBookAppointment],
    }),

    // updateTimeSlot: build.mutation({
    //   query: (data) => ({
    //     url: `${DOCTOR_SERVICE_URL}/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.doctorService],
    // }),

    cancelAppointment: build.mutation({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/cancel-appointment/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.patientBookAppointment],
    }),
  }),
});

export const {
  useBookAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetPatientAppointmentQuery,
  useSingleAppointmentQuery,
  useCancelAppointmentMutation,
  //   useTimeSlotForDoctorQuery,
  //   useUpdateTimeSlotMutation,
  //   useDeleteTimeSlotMutation,
} = AppointmentApi;
