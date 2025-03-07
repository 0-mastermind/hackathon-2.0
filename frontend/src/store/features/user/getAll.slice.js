import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios.utils";

// Async thunk for fetching all events
export const getAllUser = createAsyncThunk(
  "events/getAllUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId?.userId}/getAll`);
      return response.data; // Return the fetched events data
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the events slice
const initialState = {
  events: [], // Array to store fetched events
  loading: false, // Loading state
  error: null, // Error state
  success: false, // Success state
};

// Events slice
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
        state.events = action.payload; // Store the fetched events
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