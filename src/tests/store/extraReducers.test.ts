import taskReducer from "../../store/taskManagerSlice";
import {deleteTask, getTasks, postTask, putTask} from "../../API/taskAPI";

import {initialState, serverTasks, someState, someTask, someTasks} from "../consts";

import {Task} from "../../types/types";

const taskSorting = (task1: Task, task2: Task): number => {
    if(task1.startTime.hour !== task2.startTime.hour){
        return task1.startTime.hour - task2.startTime.hour
    }else {
        return task1.startTime.min - task2.startTime.min
    }
};

describe("redux slice (extraReducers)", ()=> {

    it("should return initial state, when passed an empty action", () => {
        const result = taskReducer(undefined, {type: ""});

        expect(result).toEqual(initialState);
    });

    describe("getTasks", () => {

        it("should change loading status with 'getTasks.pending' action", () => {
            const action = {type: getTasks.pending.type};

            const result = taskReducer(initialState, action);

            expect(result.isLoading).toEqual(true);
            expect(result.error).toEqual(null);
        });

        it("should get tasks with 'getTasks.fulfilled' action", () => {
            //serverTask === someTasks + database info
            const action = {type: getTasks.fulfilled.type, payload: serverTasks};

            const result = taskReducer({...initialState, userId: 2}, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual(null);

            expect(result.tasks).toEqual(someTasks.sort(taskSorting));
        });

        it("should set error with 'getTasks.rejected' action", () => {
            const action = {type: getTasks.rejected.type, payload: "Server error"};

            const result = taskReducer(someState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual("Server error");
        });
    });

    describe("postTask", () => {

        it("shouldn't change loading status with 'postTask.pending' action", () => {
            const action = {type: postTask.pending.type};

            const result = taskReducer(initialState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual(null);
        });

        it("should add task with 'postTask.fulfilled' action", () => {
            const newTaskList: Task[] = [...someState.tasks, someTask];
            newTaskList.sort(taskSorting);

            const action = {type: postTask.fulfilled.type, payload: someTask};

            const result = taskReducer(someState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual(null);

            expect(result.tasks).toEqual(newTaskList);
            expect(result.selectedDate).toEqual("27-11-2022");
            expect(result.selectedTasks).toEqual([someTask]);
        });

        it("should set error with 'postTask.rejected' action", () => {
            const action = {type: postTask.rejected.type, payload: "Server error"};

            const result = taskReducer(someState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual("Server error");
        });
    });

    describe("deleteTask", () => {

        it("shouldn't change loading status with 'deleteTask.pending' action", () => {
            const action = {type: deleteTask.pending.type};

            const result = taskReducer(initialState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual(null);
        });

        it("should delete task with 'deleteTask.fulfilled' action", () => {
            const action = {type: deleteTask.fulfilled.type, payload: {id: "2022-5-17T16:33:22.813Z"}};

            const result = taskReducer(someState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual(null);

            expect(result.tasks).toHaveLength(2);
            expect(result.tasks).toEqual(someState.tasks.filter(
                (task) => task.id !== "2022-5-17T16:33:22.813Z"));
            expect(result.selectedTasks).toHaveLength(1);
            expect(result.selectedTasks).toEqual(someState.tasks.filter(
                (task) => (task.day === 17 && task.id !== "2022-5-17T16:33:22.813Z")));
        });

        it("should set error with 'deleteTask.rejected' action", () => {
            const action = {type: deleteTask.rejected.type, payload: "Server error"};

            const result = taskReducer(someState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual("Server error");
        });
    });

    describe("putTask", () => {

        it("shouldn't change loading status with 'putTask.pending' action", () => {
            const action = {type: putTask.pending.type};

            const result = taskReducer(initialState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual(null);
        });

        it("should edit task with 'putTask.fulfilled' action", () => {
            const editedTask: Task = {
                id: "2022-5-17T16:33:22.813Z",
                taskText: "Edited task",
                year: 2022,
                month: 5,
                day: 17,
                startTime: {hour: 0, min: 0},
                endTime: {hour: 23, min: 59},
                color: "#00FF7F"
            };
            const editedTaskList: Task [] = [someState.tasks[0], editedTask, someState.tasks[2]];
            editedTaskList.sort(taskSorting);

            const action = {type: putTask.fulfilled.type, payload: editedTask};

            const result = taskReducer(someState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual(null);

            expect(result.tasks).toEqual(editedTaskList);
            expect(result.selectedTasks).toEqual(editedTaskList.filter((task) => task.day === 17));
        });

        it("should set error with 'putTask.rejected' action", () => {
            const action = {type: putTask.rejected.type, payload: "Server error"};

            const result = taskReducer(someState, action);

            expect(result.isLoading).toEqual(false);
            expect(result.error).toEqual("Server error");
        });
    });
});
