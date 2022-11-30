export const selectTasks = state => state.tasks.tasks;

export const selectTheme = state => state.tasks.theme || "light";

export const selectSelectedTasks = state => state.tasks.selectedTasks;
export const selectSelectedDate = state => state.tasks.selectedDate;
