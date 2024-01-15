import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const TIME_SLOT_URL = "/time-slots";

export const DoctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTimeSlot: build.mutation({
      query: (data) => ({
        url: "/time-slots/create-time-slot",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),

    timeSlots: build.query({
      query: (arg) => {
        return {
          url: TIME_SLOT_URL,
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
      providesTags: [tagTypes.timeSlot],
    }),

    timeSlot: build.query({
      query: (id) => ({
        url: `${TIME_SLOT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.timeSlot],
    }),

    timeSlotForDoctor: build.query({
      query: (id) => ({
        url: `${TIME_SLOT_URL}/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.timeSlot],
    }),

    updateTimeSlot: build.mutation({
      query: (data) => ({
        url: `${TIME_SLOT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),

    deleteTimeSlot: build.mutation({
      query: (id) => ({
        url: `${TIME_SLOT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),
  }),
});

export const {
  useAddTimeSlotMutation,
  useTimeSlotsQuery,
  useTimeSlotQuery,
  useTimeSlotForDoctorQuery,
  useUpdateTimeSlotMutation,
  useDeleteTimeSlotMutation,
} = DoctorApi;
