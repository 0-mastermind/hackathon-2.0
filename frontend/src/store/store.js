import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/login.slice";
import signupSlice from "./features/auth/signup.slice";
import getEventSlice from "./features/event/event.slice";
import getEventSlice from "./features/post/post.slice";

const featuresStore = configureStore({
    reducer: {
        loginAccount: loginSlice,
        signup: signupSlice,
        getEvent : getEventSlice,
        getPost : getPostSlice
    },
});

export default featuresStore;
