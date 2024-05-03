import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";
import { Task } from "../../interfaces/main_interface";

export async function getAllTasks() {
  try {
    const response = await axios.get(API_ENDPOINTS.TASKS);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching all tasks:", error);
  }
}


// Fonction pour ajouter un nouveau task 
export async function addTask(task: Task) {
  try {
    const response = await axios.post(API_ENDPOINTS.CREATE_TASK, task);
    return response.data;
  } catch (error: any) {
    console.error("Error creating task:", error);
  }
}

export async function deleteTask(taskId:string) {
  try {
    const response = await axios.post(API_ENDPOINTS.DELETE_TASK(taskId));
    return response.data;
  } catch (error: any) {
    console.error("Error deleting task:", error);
  }
}

export async function updateTaskStatus(task: string) {
  try {
    const response = await axios.post(API_ENDPOINTS.UPDATE_TASK_STATUS, task);
    return response.data;
  } catch (error: any) {
    console.error("Error updating task status:", error);
  }
}

export async function updateTask(task: Task) {
  try {
    const response = await axios.post(API_ENDPOINTS.UPDATE_TASK, task);
    return response.data;
  } catch (error: any) {
    console.error("Error updating task:", error);
  }
}