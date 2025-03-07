import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios.utils";

// Async thunk for fetching all posts
export const getAllPost = createAsyncThunk(
  "posts/getAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts/getAll"); // Corrected endpoint
      return response.data; // Return the fetched posts data
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the posts slice
const initialState = {
  posts: [], // Array to store fetched posts
  loading: false, // Loading state
  error: null, // Error state
  success: false, // Success state
};

// Posts slice
const getPostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {}, // You can add other reducers here if needed
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(getAllPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Handle fulfilled state
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = action.payload; // Store the fetched posts
      })
      // Handle rejected state
      .addCase(getAllPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

// Export the reducer
export default getPostSlice.reducer;