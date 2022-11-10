import {configureStore} from "@reduxjs/toolkit";
import taskReducer from "./taskManagerSlice";

export default configureStore({
    reducer: {
        tasks: taskReducer
    }
});
