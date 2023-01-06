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

    describe("getTasks", () => {

        it("should change loading status with 'getTasks.pending' action", () => {
            const action = {type: getTasks.pending.type};
            const state = taskReducer(initialState, action);

            expect(state.isLoading).toEqual(true);
            expect(state.error).toEqual(null);
        });

        it("should get tasks with 'getTasks.fulfilled' action", ()=>{
            //serverTask === someTasks + database info
            const action = {type: getTasks.fulfilled.type, payload: serverTasks};
            const state = taskReducer({...initialState, userId: 2}, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual(null);

            expect(state.tasks).toEqual(someTasks);
        });

        it("should set error with 'getTasks.rejected' action", () => {
            const action = {type: getTasks.rejected.type, payload: "Server error"};
            const state = taskReducer(someState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual("Server error");
        });
    });

    describe("postTask", () => {

        it("shouldn't change loading status with 'postTask.pending' action", () => {
            const action = {type: postTask.pending.type};
            const state = taskReducer(initialState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual(null);
        });

        it("should add task with 'postTask.fulfilled' action", ()=>{
            const action = {type: postTask.fulfilled.type, payload: someTask};
            const state = taskReducer(someState, action);

            const newTaskList: Task[] = [...someState.tasks, someTask];
            newTaskList.sort(taskSorting);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual(null);

            expect(state.tasks).toEqual(newTaskList);
            expect(state.selectedDate).toEqual("27-11-2022");
            expect(state.selectedTasks).toEqual([someTask]);
        });

        it("should set error with 'postTask.rejected' action", () => {
            const action = {type: postTask.rejected.type, payload: "Server error"};
            const state = taskReducer(someState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual("Server error");
        });
    });

    describe("deleteTask", () => {

        it("shouldn't change loading status with 'deleteTask.pending' action", () => {
            const action = {type: deleteTask.pending.type};
            const state = taskReducer(initialState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual(null);
        });

        it("should delete task with 'deleteTask.fulfilled' action", ()=>{
            const action = {type: deleteTask.fulfilled.type, payload: {id: "2021-11-27T16:33:22.812Z"}};
            const state = taskReducer(someState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual(null);

            expect(state.tasks).toHaveLength(2);
            expect(state.tasks).toEqual(someState.tasks.filter((task)=>task.id!=="2021-11-27T16:33:22.812Z"));
        });

        it("should set error with 'deleteTask.rejected' action", () => {
            const action = {type: deleteTask.rejected.type, payload: "Server error"};
            const state = taskReducer(someState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual("Server error");
        });
    });

    describe("putTask", () => {

        it("shouldn't change loading status with 'putTask.pending' action", () => {
            const action = {type: putTask.pending.type};
            const state = taskReducer(initialState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual(null);
        });

        it("should edit task with 'putTask.fulfilled' action", ()=>{
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

            const action = {type: putTask.fulfilled.type, payload: editedTask};
            const state = taskReducer(someState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual(null);

            expect(state.tasks).toEqual(editedTaskList);
            expect(state.selectedTasks).toEqual(editedTaskList.filter((task)=>task.day===17));
        });

        it("should set error with 'putTask.rejected' action", () => {
            const action = {type: putTask.rejected.type, payload: "Server error"};
            const state = taskReducer(someState, action);

            expect(state.isLoading).toEqual(false);
            expect(state.error).toEqual("Server error");
        });
    });
});
