import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const MEDICINE_MAN_URL = "/medicine-mans";

const medicineManApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //*create a new medicine man data
    addMedicineMan: build.mutation({
      query: (data) => ({
        url: "/medicine-mans/create-medicine-man",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.medicineMan],
    }),

    //*get all medicine man data
    allMedicineMan: build.query({
      //@ts-ignore
      query: (arg) => {
        return {
          url: MEDICINE_MAN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          medicineMen: response,
          meta,
        };
      },
      providesTags: [tagTypes.medicineMan],
    }),

    //*get single medicine man data
    medicineMan: build.query({
      query: (id) => ({
        url: `${MEDICINE_MAN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.medicineMan],
    }),

    //*update medicine man data
    updateMedicineMan: build.mutation({
      query: (data) => ({
        url: `${MEDICINE_MAN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.medicineMan],
    }),

    //*delete medicine man data
    deleteMedicineMan: build.mutation({
      //@ts-ignore
      query: (id) => ({
        url: `${MEDICINE_MAN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.medicineMan],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddMedicineManMutation,
  useMedicineManQuery,
  useAllMedicineManQuery,
  useUpdateMedicineManMutation,
  useDeleteMedicineManMutation,
} = medicineManApi;
