import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/login.slice";
import signupSlice from "./features/auth/signup.slice";
import getEventSlice from "./features/event/event.slice";
import getAllUserSlice from "./features/user/getAll.slice";

const featuresStore = configureStore({
    reducer: {
        loginAccount: loginSlice,
        signup: signupSlice,
        getEvent : getEventSlice,
        getAllUsers: getAllUserSlice,                                                                                       
    },
});

export default featuresStore;
