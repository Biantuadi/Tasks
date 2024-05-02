import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";
import { Task } from "../../interfaces/main_interface";

export async function getAllTasksFirebase() {
  const tasks:any = [];

  try {
    const response = await axios.get(API_ENDPOINTS.TASKS);
    response.data.forEach((task: any) => {
      tasks.push(task);
    });
  } catch (error: any) {
    console.error("Error getting tasks: ", error);
    throw error;
  }
  return tasks;
 
}


// Fonction pour ajouter un nouveau task 
export async function addTaskToFirestore(task: Task) {
  try {
    const response = await axios.post(API_ENDPOINTS.CREATE_TASK, task);
    return response.data;
  } catch (error: any) {
    console.error("Error adding task: ", error);
    throw error;
  }
}

// Fonction pour supprimer un task 

export async function deleteTaskFromFirestore(taskId:string) {
  try {
    const response = await axios.delete(API_ENDPOINTS.DELETE_ORDER(taskId));
    return response.data;
  } catch (error: any) {
    console.error("Error deleting task: ", error);
    throw error;
  }
}