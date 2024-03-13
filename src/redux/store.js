import { configureStore } from "@reduxjs/toolkit"; //
import { reducer } from "./RootReducer";
import { baseApi } from "./api/baseApi";

const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
