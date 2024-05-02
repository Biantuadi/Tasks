// store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  task: taskReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
