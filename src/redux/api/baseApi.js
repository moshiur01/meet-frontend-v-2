import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utils/axios/axiosBaseQuery";
import { getBaseUrl } from "../../utils/envConfig";
import { tagTypesList } from "../tagTypes";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
