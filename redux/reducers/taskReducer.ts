// reducers/taskReducer.js

import { createReducer } from "@reduxjs/toolkit";
import { addTaskSuccess, deleteTaskSuccess, fetchAllTasksSuccess } from "../actions/taskAction";
import { Task } from "../../interfaces/main_interface";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = createReducer(initialState, (builder:any) => {
  builder
    .addCase(fetchAllTasksSuccess, (state:any, action:any) => {
      return {
        ...state,
        // tasks: action.payload,
        // Trier les tasks par date, du plus récent au plus ancien
        tasks: action.payload.sort((a:any, b:any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }),
      };
    })
    .addCase(addTaskSuccess, (state:any, action:any) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    })
    .addCase(deleteTaskSuccess, (state:any, action:any) => {
      return {
        ...state,
        tasks: state.tasks.filter((task:Task) => task.uid !== action.payload),
      };
    })
    .addMatcher(
      (action:any) => action.type.endsWith("pending"),
      (state:any) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      }
    )
    .addMatcher(
      (action:any) => action.type.endsWith("rejected"),
      (state:any, action:any) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      }
    );
});

export default taskReducer;