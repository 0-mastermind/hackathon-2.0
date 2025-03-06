import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios.utils";

// Async thunk for logging in
export const loginAccount = createAsyncThunk(
  "loginUser",
  async (userData, { rejectWithValue }) => {
    
    try {
      const response = await api.post("/users/login", userData);
      return response.data; // Return response data on success
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  email: "",
  password: "",
  loading: false,
  error: null,
  success: false,
};

// Login slice
const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetLoginDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        const userData = action.payload.userData;
        localStorage.setItem("AUTH_DATA", JSON.stringify(userData)); // Save user data to localStorage
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setLoginDetails, resetLoginDetails } = loginSlice.actions;
export default loginSlice.reducer;