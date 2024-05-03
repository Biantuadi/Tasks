// authActions.ts

import { createAction } from "@reduxjs/toolkit";
import { login, logout, register } from "../../api/functions/authFutions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerSuccess = createAction("REGISTER_SUCCESS");
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const logoutSuccess = createAction("LOGOUT_SUCCESS");
export const checkUserLoggedIn = createAction("CHECK_USER_LOGGED_IN");

export const loginUser = (email:string, password:string) => async (dispatch:any) => {
  try {
    // Call the login function from your API to authenticate the user
    const user:any = await login(email, password);
    
    // Store the user data in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(user));
    // Dispatch the loginSuccess action with the user data
    dispatch(loginSuccess(user));
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export const registerUser = (email:string, password:string, firstname:string, lastname :string) => async (dispatch:any) => {
  try {
    // Call the register function from your API to register the user
    await register(email, password, firstname, lastname);
    dispatch(registerSuccess());
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

export const logoutUser = () => async (dispatch:any) => {
  try {
    // Call the logout function from your API to log out the user
    await logout();
    // Remove the user data from AsyncStorage
    await AsyncStorage.removeItem('user');
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const checkUserLoggedInAsync = () => async (dispatch:any) => {
  try {
    // Check if the user data exists in AsyncStorage
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      // Dispatch the loginSuccess action with the user data
      dispatch(loginSuccess(user));
    }
  } catch (error) {
    console.error("Error checking user login status:", error);
  }
};
