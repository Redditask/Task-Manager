import {TaskManagerState} from "./taskManagerSlice";

export const selectTasks = (state: { tasks: TaskManagerState; }) => state.tasks.tasks;
export const selectSelectedTasks = (state: { tasks: TaskManagerState; }) => state.tasks.selectedTasks;
export const selectSelectedDate = (state: { tasks: TaskManagerState; }) => state.tasks.selectedDate;
export const selectTheme = (state: { tasks: TaskManagerState; }) => state.tasks.theme;
