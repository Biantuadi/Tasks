// authReducer.js

import { createReducer } from "@reduxjs/toolkit";
import { registerSuccess, loginSuccess, logoutSuccess, checkUserLoggedIn } from "../actions/authActions";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerSuccess, ( state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(loginSuccess, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(logoutSuccess, (state) => {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    })
});

export default authReducer;
