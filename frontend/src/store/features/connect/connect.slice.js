import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios.utils";

// Async thunk for creating a user account
export const connectUser = createAsyncThunk(
  "user/follow",
  async ({userData, targetId}, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/${userId}/register?targetUserId=${targetId}`, userData);
      return response; // Return response data on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(errorMessage); // Ensure error is a string
    }
  }
);

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  error: null, // Ensure error is a string
  success: null,
  accountType: null // Ensure success is a string
};

// Signup slice
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    // Reducer for setting user details
    setUserDetails: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setType: (state, action) => {
      const type = action.payload;
      state.accountType = type;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        const userData = action.payload.data;
        localStorage.setItem("AUTH_DATA", JSON.stringify(userData));
        state.loading = false;
        state.success = "Account created successfully!";
        state.message = action.payload // Ensure success is a string
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure error is a string
      });
  },
});

// Export actions and reducer
export const { setUserDetails, setType } = signupSlice.actions;
export default signupSlice.reducer;