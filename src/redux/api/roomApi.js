import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const ROOM_URL = "/roomNumbers";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addRoom: build.mutation({
      query: (data) => ({
        url: "/roomNumbers/create-room-number",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.room],
    }),

    rooms: build.query({
      query: (arg) => ({
        url: ROOM_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta) => {
        return {
          rooms: response,
          meta,
        };
      },
      providesTags: [tagTypes.room],
    }),

    notBookedRooms: build.query({
      query: (arg) => ({
        url: `${ROOM_URL}/not-book`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta) => {
        return {
          rooms: response,
          meta,
        };
      },
      providesTags: [tagTypes.room],
    }),

    room: build.query({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.room],
    }),

    updateRoom: build.mutation({
      query: (data) => ({
        url: `${ROOM_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.room],
    }),

    deleteRoom: build.mutation({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.room],
    }),
  }),
});

export const {
  useAddRoomMutation,
  useRoomsQuery,
  useNotBookedRoomsQuery,
  useRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
