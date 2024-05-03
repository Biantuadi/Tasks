import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export async function getAllUsers() {
  try {
    const response = await axios.get(API_ENDPOINTS.ALL_USERS);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
}

export async function getGroups(){
  try {
    const response = await axios.get(API_ENDPOINTS.ALL_GROUPS);
    return response.data;
  } catch (error) {
    console.error("Error fetching all groups:", error);
  }
  
}



export async function getUserById(userId: string) {
  const response:any = axios.get(API_ENDPOINTS.USER_BY_ID(userId))
  
  return response.data;
}
