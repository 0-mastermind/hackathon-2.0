import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/login.slice";
import signupSlice from "./features/auth/signup.slice";

const featuresStore = configureStore({
    reducer: {
        loginAccount: loginSlice,
        signup: signupSlice
    },
});

export default featuresStore;
