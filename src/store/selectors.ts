import {TaskManagerState} from "./taskManagerSlice";

import {Task, Theme} from "../types/types";

export const selectTasks = (state: { tasks: TaskManagerState; }): Task[] => state.tasks.tasks;
export const selectSelectedTasks = (state: { tasks: TaskManagerState; }): Task[] => state.tasks.selectedTasks;
export const selectSelectedDate = (state: { tasks: TaskManagerState; }): string | null => state.tasks.selectedDate;
export const selectTheme = (state: { tasks: TaskManagerState; }): Theme => state.tasks.theme;
export const selectUserId = (state: {tasks: TaskManagerState; }): number | null => state.tasks.userId;
export const selectLoadingStatus = (state: {tasks: TaskManagerState; }): boolean => state.tasks.isLoading;
export const selectError = (state: {tasks: TaskManagerState; }): string | null => state.tasks.error;
