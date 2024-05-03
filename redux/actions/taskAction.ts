// actions/taskActions.js

import { createAction } from "@reduxjs/toolkit";
import { addTask, deleteTask, getAllTasks } from "../../api/functions/taskFunctions";

export const fetchAllTasksSuccess = createAction("FETCH_ALL_TASKS_SUCCESS");
export const addTaskSuccess = createAction("ADD_TASK_SUCCESS");
export const deleteTaskSuccess = createAction("DELETE_TASK_SUCCESS");


export const fetchAllTasks = () => async (dispatch:any) => {
  try {
    const tasks = await getAllTasks();
    dispatch(fetchAllTasksSuccess(tasks));
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    // Vous pouvez gérer les erreurs ici, comme afficher un message d'erreur à l'utilisateur
  }
};

export const addTaskAsync = (task:any) => async (dispatch:any) => {
  try {
    // Appel de la fonction  pour ajouter le task
    const newTaskId = await addTask(task);
    dispatch(addTaskSuccess({ ...task, id: newTaskId }));
  } catch (error) {
    console.error("Error adding task:", error);
    // Gérer les erreurs ici
  }
};


export const deleteTaskAsync = (taskId:any) => async (dispatch:any) => {
  
  try {
    await deleteTask(taskId);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    // Gérer les erreurs ici
  }
};

