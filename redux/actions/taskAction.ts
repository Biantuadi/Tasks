// actions/taskActions.js

import { createAction } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
} from "../../api/functions/taskFunctions";

export const fetchAllTasksSuccess = createAction("FETCH_ALL_TASKS_SUCCESS");
export const addTaskSuccess = createAction("ADD_TASK_SUCCESS");
export const updateTaskSuccess = createAction("UPDATE_TASK_SUCCESS");
export const deleteTaskSuccess = createAction("DELETE_TASK_SUCCESS");

export const fetchAllTasks = () => async (dispatch: any) => {
  try {
    const tasks = await getAllTasks();
    dispatch(fetchAllTasksSuccess(tasks));
  } catch (error) {
    console.error("Error fetching all tasks:", error);
  }
};

export const addTaskAsync = (task: any) => async (dispatch: any) => {
  try {
    await addTask(task);

    dispatch(addTaskSuccess({ ...task, _id: task._id }));
  } catch (error) {
    console.error("Error adding task : ", error);
  }
};

export const updateTaskAsync = (task: any) => async (dispatch: any) => {
  try {
    await updateTask(task);
    dispatch(updateTaskSuccess(task));
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTaskAsync = (taskId: any) => async (dispatch: any) => {
  try {
    await deleteTask(taskId);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
