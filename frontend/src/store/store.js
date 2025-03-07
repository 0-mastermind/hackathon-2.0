import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/login.slice";
import signupSlice from "./features/auth/signup.slice";
import getEventSlice from "./features/event/event.slice";
<<<<<<< HEAD
import getAllUserSlice from "./features/user/getAll.slice";
=======
import getEventSlice from "./features/post/post.slice";
>>>>>>> 0e5647d7e1aad441490a59685714c65fa7b74d67

const featuresStore = configureStore({
    reducer: {
        loginAccount: loginSlice,
        signup: signupSlice,
        getEvent : getEventSlice,
<<<<<<< HEAD
        getAllUsers: getAllUserSlice,                                                                                       
=======
        getPost : getPostSlice
>>>>>>> 0e5647d7e1aad441490a59685714c65fa7b74d67
    },
});

export default featuresStore;
