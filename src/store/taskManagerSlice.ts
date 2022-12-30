import {ActionReducerMapBuilder, createSlice, current, PayloadAction} from "@reduxjs/toolkit";

import {ServerTask, Task, Theme} from "../types/types";

import {getTasks} from "../API/taskAPI";

const taskSorting = (task1: Task, task2: Task): number => task1.startTime.hour - task2.startTime.hour;

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
    selectedDate: string;
    theme: Theme;
    userId: number;
}

const initialState: TaskManagerState = {
    tasks: [],
    selectedTasks: [],
    selectedDate: "",
    theme: "light",
    userId: 0,
};

const taskManagerSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push({
                id: action.payload.id,
                taskText: action.payload.taskText,
                year: action.payload.year,
                month: action.payload.month,
                day: action.payload.day,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime,
                color: action.payload.color
            });
            state.tasks.sort(taskSorting);

            state.selectedTasks = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === action.payload.year
                    && state.tasks[i].month === action.payload.month
                    && state.tasks[i].day === action.payload.day) {
                    state.selectedTasks.push(state.tasks[i]);
                }
            }

            state.selectedDate = `${action.payload.day}-${action.payload.month}-${action.payload.year}`;
            //console.log(current(state)) для просмотра состояния tasks
        },
        removeTask(state, action: PayloadAction<{ id: string }>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            state.selectedTasks = state.selectedTasks.filter(task => task.id !== action.payload.id);
        },
        editTask(state, action: PayloadAction<Task>) {
            taskEditing(state.tasks, action);

            taskEditing(state.selectedTasks, action);
        },
        setSelectedCell(state, action: PayloadAction<string>) {
            const [day, month, year]: string[] = action.payload.split("-");

            state.selectedTasks = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === Number(year)
                    && state.tasks[i].month === Number(month)
                    && state.tasks[i].day === Number(day)) {
                    state.selectedTasks.push(state.tasks[i]);
                }
            }

            state.selectedDate = `${day}-${month}-${year}`;
        },
        changeTheme(state, action: PayloadAction<{ theme: Theme }>) {
            const root: Element | null = document.querySelector(":root");

            const themeVariable: string[] = [
                "Color", "BgColor",
                "BorderColor", "ButtonColor",
                "ShadowColor", "HoverBgColor",
                "HoverColor", "ActiveMonthColor",
                "UnActiveMonthColor"
            ];

            themeVariable.forEach(variable => {
                // @ts-ignore
                root.style.setProperty(
                    `--default${variable}`,
                    `var(--${action.payload.theme}${variable}`)
            });

            state.theme = action.payload.theme;
        },
        setUserId(state, action: PayloadAction<{ userId: number }>) {
            if (action.payload.userId === 0) {
                localStorage.removeItem("token");
                return {...initialState};
            } else state.userId = action.payload.userId;
        },
    }, extraReducers: (builder: ActionReducerMapBuilder<TaskManagerState>) => {
        builder
            .addCase(getTasks.fulfilled, (state, action: PayloadAction<ServerTask []>) => {
                const tasks = action.payload;
                state.tasks = [];
                tasks.forEach((task: ServerTask) => {
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
                });

                state.tasks.sort(taskSorting);
            });
    }
});

export const {
    addTask,
    removeTask,
    editTask,
    setSelectedCell,
    changeTheme,
    setUserId
} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
