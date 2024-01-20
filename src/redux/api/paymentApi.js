import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const PAYMENT_URL = "/payments";

export const DoctorReviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // addDoctorReview: build.mutation({
    //   query: (data) => ({
    //     url: "/doctor-reviews/create-review",
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.payment],
    // }),

    payments: build.query({
      query: (arg) => {
        return {
          url: PAYMENT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          payments: response,
          meta,
        };
      },
      providesTags: [tagTypes.payment],
    }),

    singlePayment: build.query({
      query: (id) => ({
        url: `${PAYMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),

    updatePayment: build.mutation({
      query: (data) => ({
        url: `${PAYMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.payment],
    }),

    // deleteDoctorReview: build.mutation({
    //   query: (id) => ({
    //     url: `${PAYMENT_URL}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.doctorReview],
    // }),
  }),
});

export const {
  usePaymentsQuery,
  useSinglePaymentQuery,
  useUpdatePaymentMutation,
} = DoctorReviewApi;
