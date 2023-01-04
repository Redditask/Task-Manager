import {TaskManagerState} from "../store/taskManagerSlice";
import {Task} from "../types/types";

export const initialState: TaskManagerState = {
    tasks: [],
    selectedTasks: [],
    selectedDate: "",
    theme: "light",
    userId: 1,
    error: null,
    isLoading: false
};

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

export const someState: TaskManagerState = {
    tasks: someTasks,
    selectedTasks: [someTasks[2], someTasks[3]],
    selectedDate: "17-5-2022",
    theme: "light",
    userId: 1,
    error: null,
    isLoading: false
};

export const anotherState: TaskManagerState = {...someState, error: "Server error", isLoading: true};
