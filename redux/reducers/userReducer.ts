import { createReducer } from "@reduxjs/toolkit";
import { fetchAllUsersSuccess, fetchGroupsSuccess, fetchMeSuccess, fetchUserByIdSuccess } from "../actions/userAction";

const initialState = {
  allUsers: [],
  groups: [],
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
    .addCase(fetchGroupsSuccess, (state:any, action:any) => {
      return {
        ...state,
        groups: action.payload,
      };
    })
    .addCase(fetchMeSuccess, (state:any, action:any) => {
      return {
        ...state,
        me: action.payload,
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
