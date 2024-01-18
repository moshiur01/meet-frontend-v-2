import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const DOCTOR_SERVICE_URL = "/doctor-services";

export const DoctorServiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDoctorService: build.mutation({
      query: (data) => ({
        url: "/doctor-services/create-doctor-service",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorService],
    }),

    doctorServices: build.query({
      query: (arg) => {
        return {
          url: DOCTOR_SERVICE_URL,
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
      providesTags: [tagTypes.doctorService],
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
        url: `${DOCTOR_SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorService],
    }),

    // updateTimeSlot: build.mutation({
    //   query: (data) => ({
    //     url: `${DOCTOR_SERVICE_URL}/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.doctorService],
    // }),

    deleteDoctorService: build.mutation({
      query: (id) => ({
        url: `${DOCTOR_SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorService],
    }),
  }),
});

export const {
  useAddDoctorServiceMutation,
  useDoctorServicesQuery,
  useSingleDoctorServiceQuery,
  //   useTimeSlotForDoctorQuery,
  //   useUpdateTimeSlotMutation,
  useDeleteDoctorServiceMutation,
} = DoctorServiceApi;
