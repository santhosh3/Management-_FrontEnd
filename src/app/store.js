import { configureStore } from "@reduxjs/toolkit";
import projectReducer from '../features/projects/projectSlice';
import roleReducer from '../features/roles/roleSlice';
import userReducer from '../features/users/userSlice';
import taskSlice from "../features/tasks/taskSlice";
import storySlice from "../features/cards/storiesSlice";
import loginSlice from "../features/login/loginSlice";

export const store = configureStore({
    reducer: {
        project: projectReducer,
        role: roleReducer,
        user: userReducer,
        task: taskSlice,
        story: storySlice,
        login: loginSlice
    }
})