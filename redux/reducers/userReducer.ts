import { createReducer } from "@reduxjs/toolkit";
import { fetchAllUsersSuccess, fetchMeSuccess, fetchUserByIdSuccess } from "../actions/userAction";

const initialState = {
  allUsers: [],
  userById: null,
};

const userReducer = createReducer(initialState, (builder:any) => {
  builder
    .addCase(fetchAllUsersSuccess, (state:any, action:any) => {
      return {
        ...state,
        allUsers: action.payload,
      };
    })
    .addCase(fetchUserByIdSuccess, (state:any, action:any) => {
      return {
        ...state,
        userById: action.payload,
      };
    })
});

export default userReducer;
