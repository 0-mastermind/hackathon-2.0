import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios.utils";

// Async thunk for fetching all events
export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/events/getAll");
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
const getEventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {}, // You can add other reducers here if needed
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Handle fulfilled state
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.events = action.payload; // Store the fetched events
      })
      // Handle rejected state
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

// Export the reducer
export default getEventSlice.reducer;