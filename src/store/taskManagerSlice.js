import {createSlice, current} from "@reduxjs/toolkit";

const taskManagerSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        currentCell: []
    },
    reducers: {
        addTask(state, action) {
            state.tasks.push({
                id: new Date().toISOString(),
                taskText: action.payload.taskText,
                year: action.payload.year,
                month: action.payload.month,
                day: action.payload.day
            })

            state.currentCell = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === action.payload.year
                    && state.tasks[i].month === action.payload.month
                    && state.tasks[i].day === action.payload.day) {
                        state.currentCell.push(state.tasks[i])
                }
            }
        },
        deleteTask(state, action) {

        },
        setCurrentCell(state, action) {
            const [day, month, year] = action.payload.split("-");

            state.currentCell = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === Number(year)
                    && state.tasks[i].month === Number(month)
                    && state.tasks[i].day === Number(day)) {
                        state.currentCell.push(state.tasks[i])
                }
            }
        }
    }
});

export const {addTask, deleteTask, setCurrentCell} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
