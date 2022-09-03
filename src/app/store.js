import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../features/api/postApi";
import { taskApi } from "../features/api/taskApi";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postApi.middleware, taskApi.middleware]),
});
  