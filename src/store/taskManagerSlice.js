import {createSlice, current} from "@reduxjs/toolkit";

const taskManagerSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        currentCell: {}
    },
    reducers: {
        addTask(state, action){
            console.log(action.payload)

            state.tasks.push({
                id: new Date().toISOString(),
                taskText: action.payload.taskText,
                year: action.payload.year,
                month: action.payload.month,
                day: action.payload.day
            })

            //доработать
            state.currentCell = state.tasks[0];
        },
        deleteTask(state, action){

        },
    }
});

export const {addTask, deleteTask} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
