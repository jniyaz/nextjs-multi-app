import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(POSTS_URL);
    return [...res.data];
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const res = await axios.post(POSTS_URL, initialPost);
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const res = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return res.data;
    } catch (err) {
      // return err.message;
      return initialPost; // testing - only for redux data
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const res = await axios.delete(`${POSTS_URL}/${id}`);
      if (res?.status === 200) return initialPost;
      return `${res.status} : ${res.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          // add date, reactions to post
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        // state.posts = state.posts.concat(loadedPosts);
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("update could not complete");
          console.log(action.payload);
          return;
        }
        // const { id } = action.payload;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        // const posts = state.posts.filter((post) => post.id !== id);
        // state.posts = [...posts, action.payload];
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        // const posts = state.posts.filter((post) => post.id !== id);
        // state.posts = posts;
        postsAdapter.removeOne(state, id);
      });
  },
});

// export const getAllPosts = (state) => state.posts.posts;
// get selectors create these selectors and we rename them with aliases using destructing
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
// export const getPostById = (state, id) =>
//   state.posts.posts.find((post) => post.id === id);

export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
