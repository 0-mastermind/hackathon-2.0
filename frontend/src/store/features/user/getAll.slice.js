import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios.utils";

// Async thunk for fetching all users
export const getAllUser = createAsyncThunk(
  "users/getAllUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId?.userId}/getAll`);
      // Return only the serializable part of the response
      return response.data.data; // Assuming the users are in `response.data.data`
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the users slice
const initialState = {
  users: [], // Array to store fetched users
  loading: false, // Loading state
  error: null, // Error state
  success: false, // Success state
};

// Users slice
const getAllUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // You can add other reducers here if needed
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Handle fulfilled state
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload; // Store the fetched users
      })
      // Handle rejected state
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

// Export the reducer
export default getAllUserSlice.reducer;