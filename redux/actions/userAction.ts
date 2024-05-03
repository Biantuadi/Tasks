import { createAction } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, getGroups } from "../../api/functions/userFuctions";

export const fetchAllUsersSuccess = createAction("FETCH_ALL_USERS_SUCCESS");
export const fetchGroupsSuccess = createAction("FETCH_GROUPS_SUCCESS");
export const fetchUserByIdSuccess = createAction("FETCH_USER_BY_ID_SUCCESS");
export const fetchMeSuccess = createAction("FETCH_ME_SUCCESS");

export const fetchAllUsers = () => async (dispatch:any) => {
  try {
    const users = await getAllUsers();
    dispatch(fetchAllUsersSuccess( users as any));
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
};

export const fetchGroups = () => async (dispatch:any) => {
  try {
    const groups = await getGroups();
    dispatch(fetchGroupsSuccess(groups as any));
  } catch (error) {
    console.error("Error fetching groups:");
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