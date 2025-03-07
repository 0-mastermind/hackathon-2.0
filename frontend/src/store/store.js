import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/login.slice";
import signupSlice from "./features/auth/signup.slice";
import getEventSlice from "./features/event/event.slice";
import getAllUserSlice from "./features/user/getAll.slice";
import getPostSlice from "./features/post/post.slice";
<<<<<<< HEAD

=======
>>>>>>> 800aefdaadfd38d6af15896289c21fae5b3ad09c
import connectToUserSlice from "./features/connect/connect.slice";

const featuresStore = configureStore({
    reducer: {
        loginAccount: loginSlice,
        signup: signupSlice,
        getEvent : getEventSlice,
        getAllUsers: getAllUserSlice,                                                                                       
        getPost : getPostSlice,
        followUser: connectToUserSlice
    },
});

export default featuresStore;
