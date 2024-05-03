import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";
import { Task } from "../../interfaces/main_interface";

const tasks:any = [
  {
    id: "1",
    title: "Task 1",
    description: "Description for task 1",
    status: "Todo",
    dueDate: "2021-12-01",
    priority: "High",
    creator_id: "234",
    assignee_id: "2",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description for task 2",
    status: "Doing",
    dueDate: "2021-12-02",
    priority: "Medium",
    creator_id: "2",
    assignee_id: "2",
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description for task 3",
    status: "Done",
    dueDate: "2021-12-03",
    priority: "Low",
    creator_id: "2",
    assignee_id: "234",
  },
];

export async function getAllTasks() {
  // const tasks:any = [];

  // try {
  //   const response = await axios.get(API_ENDPOINTS.TASKS);
  //   response.data.forEach((task: any) => {
  //     tasks.push(task);
  //   });
  // } catch (error: any) {
  //   console.error("Error getting tasks: ", error);
  //   throw error;
  // }

  return tasks;
}


// Fonction pour ajouter un nouveau task 
export async function addTask(task: Task) {
  // try {
  //   const response = await axios.post(API_ENDPOINTS.CREATE_TASK, task);
  //   return response.data;
  // } catch (error: any) {
  //   console.error("Error adding task: ", error);
  //   throw error;
  // }
  tasks.push(task);
  return task.id;
}

// Fonction pour supprimer un task 

export async function deleteTask(taskId:string) {
  // try {
  //   const response = await axios.delete(API_ENDPOINTS.DELETE_ORDER(taskId));
  //   return response.data;
  // } catch (error: any) {
  //   console.error("Error deleting task: ", error);
  //   throw error;
  // }
  const taskIndex = tasks.findIndex((task:any) => task.id === taskId);
  tasks.splice(taskIndex, 1);
  return taskId;
}