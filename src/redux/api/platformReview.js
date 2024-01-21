import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const PLATFORM_REVIEW_URL = "/platform-reviews";

const medicineManApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //*create a new platformReview data
    addPlatformReview: build.mutation({
      query: (data) => ({
        url: "/platform-reviews/create-platform-review",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.platformReview],
    }),

    //*get all medicine man data
    allPlatformReviews: build.query({
      //@ts-ignore
      query: (arg) => {
        return {
          url: PLATFORM_REVIEW_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          platformReviews: response,
          meta,
        };
      },
      providesTags: [tagTypes.platformReview],
    }),

    //*delete medicine man data
    deletePlatformReview: build.mutation({
      //@ts-ignore
      query: (id) => ({
        url: `${PLATFORM_REVIEW_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.platformReview],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddPlatformReviewMutation,
  useAllPlatformReviewsQuery,
  useDeletePlatformReviewMutation,
} = medicineManApi;
