import {TaskManagerState} from "../store/taskManagerSlice";
import {ServerTask, Task} from "../types/types";

//tasks
export const someTasks: Task [] = [
    {
        id: "2021-11-27T16:33:22.812Z",
        taskText: "Your task 1",
        year: 2021,
        month: 11,
        day: 27,
        startTime: {hour: 0, min: 0},
        endTime: {hour: 23, min: 59},
        color: "beige"
    },
    {
        id: "2022-5-17T16:33:22.813Z",
        taskText: "Your task 2",
        year: 2022,
        month: 5,
        day: 17,
        startTime: {hour: 15, min: 15},
        endTime: {hour: 16, min: 24},
        color: "#00FF7F"
    },
    {
        id: "2022-5-17T16:33:22.814Z",
        taskText: "Your task 3",
        year: 2022,
        month: 5,
        day: 17,
        startTime: {hour: 16, min: 20},
        endTime: {hour: 16, min: 24},
        color: "beige"
    }
];

export const serverTasks: ServerTask [] = [
    {
        id: "2021-11-27T16:33:22.812Z",
        taskText: "Your task 1",
        year: 2021,
        month: 11,
        day: 27,
        startTime: {hour: 0, min: 0},
        endTime: {hour: 23, min: 59},
        color: "beige",
        createdAt: "...",
        updatedAt: "...",
        userId: 2,
    },
    {
        id: "2022-5-17T16:33:22.813Z",
        taskText: "Your task 2",
        year: 2022,
        month: 5,
        day: 17,
        startTime: {hour: 15, min: 15},
        endTime: {hour: 16, min: 24},
        color: "#00FF7F",
        createdAt: "...",
        updatedAt: "...",
        userId: 2,
    },
    {
        id: "2022-5-17T16:33:22.814Z",
        taskText: "Your task 3",
        year: 2022,
        month: 5,
        day: 17,
        startTime: {hour: 16, min: 20},
        endTime: {hour: 16, min: 24},
        color: "beige",
        createdAt: "...",
        updatedAt: "...",
        userId: 2,
    }
];

export const someTask: Task = {
    id: "2021-11-28T16:33:22.820Z",
    taskText: "Your some task",
    year: 2022,
    month: 11,
    day: 27,
    startTime: {hour: 0, min: 0},
    endTime: {hour: 23, min: 59},
    color: "beige"
};

//states
export const initialState: TaskManagerState = {
    tasks: [],
    selectedTasks: [],
    selectedDate: "",
    theme: "light",
    userId: 0,
    error: null,
    isLoading: false
};

export const someState: TaskManagerState = {
    tasks: someTasks,
    selectedTasks: [someTasks[1], someTasks[2]],
    selectedDate: "17-5-2022",
    theme: "light",
    userId: 1,
    error: null,
    isLoading: false
};

export const anotherState: TaskManagerState = {...someState, selectedTasks: [], selectedDate:"16-5-2022", error: "Server error", isLoading: true};
