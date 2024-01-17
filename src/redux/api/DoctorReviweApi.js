import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const DOCTOR_REVIEW_URL = "/doctor-reviews";

export const DoctorReviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDoctorReview: build.mutation({
      query: (data) => ({
        url: "/doctor-reviews/create-review",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorReview],
    }),

    doctorReviews: build.query({
      query: (arg) => {
        return {
          url: DOCTOR_REVIEW_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          doctorReviews: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorReview],
    }),

    specificDoctorReviews: build.query({
      query: (id) => ({
        url: `${DOCTOR_REVIEW_URL}/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorReview],
    }),

    singleDoctorReview: build.query({
      query: (id) => ({
        url: `${DOCTOR_REVIEW_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorReview],
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
  useAddDoctorReviewMutation,
  useDoctorReviewsQuery,
  useSingleDoctorReviewQuery,
  useSpecificDoctorReviewsQuery,
} = DoctorReviewApi;
