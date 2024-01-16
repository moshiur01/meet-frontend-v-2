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

    doctorServices: build.query({
      query: (arg) => {
        return {
          url: APPOINTMENT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          timeSlot: response,
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

    singleDoctorService: build.query({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
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

    // deleteTimeSlot: build.mutation({
    //   query: (id) => ({
    //     url: `${DOCTOR_SERVICE_URL}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.doctorService],
    // }),
  }),
});

export const {
  useBookAppointmentMutation,
  useDoctorServicesQuery,
  useSingleDoctorServiceQuery,
  //   useTimeSlotForDoctorQuery,
  //   useUpdateTimeSlotMutation,
  //   useDeleteTimeSlotMutation,
} = AppointmentApi;
