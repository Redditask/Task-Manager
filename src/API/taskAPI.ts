import {createAsyncThunk} from "@reduxjs/toolkit";

import {$authHost} from "./index";

import {ServerTask, Task} from "../types/types";

export const getTasks = createAsyncThunk<ServerTask [], number, {rejectValue: string}>(
  "tasks/getTasks",
    async function (userId, {rejectWithValue}){
        const response = await $authHost.get(`api/task/${userId}`);

        if (response.status !== 200){
            return rejectWithValue("Server error");
        }

        return response.data;
    }
);

export const postTask = createAsyncThunk<Task, {task: Task, userId: number}, {rejectValue: string}>(
    "tasks/postTask",
    async function ({task, userId}, {rejectWithValue, dispatch}) {
        task.id = new Date().toISOString();
        const response = await $authHost.post(`api/task/`, {task, userId});

        if (response.status !== 200) {
            return rejectWithValue("Server error");
        }

        return task;
    }
);

export const deleteTask = createAsyncThunk<{id: string}, {id: string, userId: number}, {rejectValue: string}>(
  "tasks/deleteTask",
  async function ({id, userId}, {rejectWithValue, dispatch}){
      const response = await $authHost.delete(`api/task/${userId}`, {data: {id}});

      if (response.status !== 200) {
          return rejectWithValue("Server error");
      }

      return {id};
  }
);

export const putTask = createAsyncThunk<Task, {task: Task, userId: number}, {rejectValue: string}>(
    "tasks, putTask",
    async function ({task, userId}, {rejectWithValue, dispatch}){
        const response = await $authHost.put(`api/task/${userId}`, {task});

        if (response.status !== 200) {
            return rejectWithValue("Server error");
        }

        return task
    }
);
