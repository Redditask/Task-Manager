import {ActionReducerMapBuilder, AnyAction, createSlice, current, PayloadAction} from "@reduxjs/toolkit";

import {ServerTask, Task, Theme} from "../types/types";

import {deleteTask, getTasks, createTask, updateTask} from "../API/taskAPI";

import {themeVariable} from "../utils/consts";

const taskPushing = (state: TaskManagerState, task: Task): void => {
    state.tasks.push({
        id: task.id,
        taskText: task.taskText,
        year: task.year,
        month: task.month,
        day: task.day,
        startTime: task.startTime,
        endTime: task.endTime,
        color: task.color,
    });
};

const selectedTaskPushing = (state: TaskManagerState, taskDay: string, taskMonth: string, taskYear: string): void => {
    for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].year === Number(taskYear)
            && state.tasks[i].month === Number(taskMonth)
            && state.tasks[i].day === Number(taskDay)) {
            state.selectedTasks.push(state.tasks[i]);
        }
    }
};

const isError = (action: AnyAction): boolean => {
    return String(action.type).endsWith("rejected");
};

const taskSorting = (task1: Task, task2: Task): number => {
    if(task1.startTime.hour !== task2.startTime.hour){
        return task1.startTime.hour - task2.startTime.hour;
    }else {
        return task1.startTime.min - task2.startTime.min;
    }
};

const taskEditing = (stateVariable: Task[], action: PayloadAction<Task>): void => {
    stateVariable.forEach(task => {
        if (task.id === action.payload.id) {
            task.taskText = action.payload.taskText;
            task.color = action.payload.color;
            task.startTime = action.payload.startTime;
            task.endTime = action.payload.endTime;
        }
    });
    stateVariable.sort(taskSorting);
};

export interface TaskManagerState {
    tasks: Task[];
    selectedTasks: Task[];
    selectedDate: string | null;
    theme: Theme;
    userId: number | null;
    error: string | null;
    isLoading: boolean;
}

const initialState: TaskManagerState = {
    tasks: [],
    selectedTasks: [],
    selectedDate: null,
    theme: "light",
    userId: null,
    error: null,
    isLoading: false,
};

//console.log(current(state)) для просмотра состояния tasks
const taskManagerSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setSelectedCell(state, action: PayloadAction<{ date: string }>) {
            const [day, month, year]: string[] = action.payload.date.split("-");

            state.selectedTasks = [];
            selectedTaskPushing(state, day, month, year);

            state.selectedDate = `${day}-${month}-${year}`;
        },
        setTheme(state, action: PayloadAction<{ theme: Theme }>) {
            const root: Element | null = document.querySelector(":root");

            themeVariable.forEach(variable => {
                // @ts-ignore
                root.style.setProperty(
                    `--default${variable}`,
                    `var(--${action.payload.theme}${variable}`)
            });

            state.theme = action.payload.theme;
        },
        setUserId(state, action: PayloadAction<{ userId: number | null }>) {
            if (action.payload.userId === null) {
                localStorage.removeItem("token");
                return {...initialState};
            } else state.userId = action.payload.userId;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<TaskManagerState>) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action: PayloadAction<ServerTask []>) => {
                state.isLoading = false;

                const tasks = action.payload;
                state.tasks = [];
                tasks.forEach((task: ServerTask) => {
                    taskPushing(state, task);
                });
                state.tasks.sort(taskSorting);

                if (state.selectedDate) {
                    const [day, month, year]: string[] = state.selectedDate.split("-");

                    state.selectedTasks = [];
                    selectedTaskPushing(state, day, month, year);
                }
            })
            .addCase(createTask.pending, (state) => {
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
                taskPushing(state, action.payload);
                state.tasks.sort(taskSorting);

                state.selectedTasks = [];
                selectedTaskPushing(
                    state,
                    String(action.payload.day),
                    String(action.payload.month),
                    String(action.payload.year)
                );

                state.selectedDate =
                    `${action.payload.day}-${action.payload.month}-${action.payload.year}`;
            })
            .addCase(deleteTask.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
                state.selectedTasks = state.selectedTasks.filter(task => task.id !== action.payload.id);
            })
            .addCase(updateTask.pending, (state) => {
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                taskEditing(state.tasks, action);

                taskEditing(state.selectedTasks, action);
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {
    setSelectedCell,
    setTheme,
    setUserId,
} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
