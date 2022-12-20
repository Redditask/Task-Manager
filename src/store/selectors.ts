import {TaskManagerState} from "./taskManagerSlice";

import {Task, Theme} from "../types/types";

export const selectTasks = (state: { tasks: TaskManagerState; }): Task[] => state.tasks.tasks;
export const selectSelectedTasks = (state: { tasks: TaskManagerState; }): Task[] => state.tasks.selectedTasks;
export const selectSelectedDate = (state: { tasks: TaskManagerState; }): string => state.tasks.selectedDate;
export const selectTheme = (state: { tasks: TaskManagerState; }): Theme => state.tasks.theme;
