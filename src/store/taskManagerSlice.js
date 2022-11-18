import {createSlice} from "@reduxjs/toolkit";

const taskManagerSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        currentCellTasks: [],
        currentCellDate: "",
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

            state.currentCellTasks = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === action.payload.year
                    && state.tasks[i].month === action.payload.month
                    && state.tasks[i].day === action.payload.day) {
                        state.currentCellTasks.push(state.tasks[i])
                }
            }
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task=>task.id!==action.payload);
            state.currentCellTasks = state.currentCellTasks.filter(task=>task.id!==action.payload);
        },
        setCurrentCell(state, action) {
            const [day, month, year] = action.payload.split("-");

            state.currentCellTasks = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === Number(year)
                    && state.tasks[i].month === Number(month)
                    && state.tasks[i].day === Number(day)) {
                        state.currentCellTasks.push(state.tasks[i])
                }
            }

            state.currentCellDate = action.payload;
        },
    }
});

export const {
    addTask,
    removeTask,
    setCurrentCell,
} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
