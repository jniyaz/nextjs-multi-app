import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/blog/posts/postsSlice";
import counterSlice from '../features/counter/counterSlice';
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        posts: postsSlice,
        users: usersSlice
    }
})