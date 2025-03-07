import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios.utils";

// Async thunk for connecting users
export const connectUser = createAsyncThunk(
  "user/follow",
  async ({ userId, targetId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/${userId}/connect?targetUserId=${targetId}`);
      // Return only the necessary data from the response
      return response.data; // Ensure only serializable data is returned
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(errorMessage); // Ensure error is a string
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: null, // Add a message field to store success messages
};

// Slice for connecting users
const connectToUserSlice = createSlice({
  name: "connectUser",
  initialState,
  reducers: {
    // Reducer for resetting the state
    resetConnectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(connectUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message; // Store the success message
      })
      .addCase(connectUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

// Export actions and reducer
export const { resetConnectState } = connectToUserSlice.actions;
export default connectToUserSlice.reducer;