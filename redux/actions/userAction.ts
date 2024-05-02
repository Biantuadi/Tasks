import { createAction } from "@reduxjs/toolkit";
import { getAllUsers, getUserById } from "../../api/functions/userFuctions";

export const fetchAllUsersSuccess = createAction("FETCH_ALL_USERS_SUCCESS");
export const fetchUserByIdSuccess = createAction("FETCH_USER_BY_ID_SUCCESS");
export const fetchMeSuccess = createAction("FETCH_ME_SUCCESS");

export const fetchAllUsers = () => async (dispatch:any) => {
  try {
    const users = await getAllUsers();
    dispatch(fetchAllUsersSuccess(users));
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
};

export const fetchUserById = (userId:any) => async (dispatch :any) => {
  try {
    const user = await getUserById(userId);
    dispatch(fetchUserByIdSuccess(user as any));
  } catch (error) {
    console.error("Error fetching user by ID:", error);
  }
};