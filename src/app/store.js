import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../features/api/postApi";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
