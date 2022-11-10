import {createSlice} from "@reduxjs/toolkit";

const taskManagerSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: []
    },
    reducers: {
        addTask(state, action){
            console.log(action.payload)

            state.tasks.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                year: action.payload.year,
                month: action.payload.month,
                day: action.payload.day
            })
        },
        deleteTask(state, action){

        }
    }
});

export const {addTask, deleteTask} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
