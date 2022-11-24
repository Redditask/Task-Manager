import {createSlice, current} from "@reduxjs/toolkit";

const taskManagerSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        currentCellTasks: [],
        currentCellDate: "",
        theme: "",
    },
    reducers: {
        addTask(state, action) {
            state.tasks.push({
                id: new Date().toISOString(),
                taskText: action.payload.taskText,
                year: action.payload.year,
                month: action.payload.month,
                day: action.payload.day,
                color: action.payload.color
            });

            state.currentCellTasks = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === action.payload.year
                    && state.tasks[i].month === action.payload.month
                    && state.tasks[i].day === action.payload.day) {
                    state.currentCellTasks.push(state.tasks[i]);
                }
            }

            state.currentCellDate = action.payload.day + "-" + action.payload.month + "-" + action.payload.year;
            //console.log(current(state)) для просмотра состояния tasks
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            state.currentCellTasks = state.currentCellTasks.filter(task => task.id !== action.payload);
        },
        editTask(state, action) {
            state.tasks.forEach(task => {
                if (task.id === action.payload.id) {
                    task.taskText = action.payload.text;
                    task.color = action.payload.color;
                }
            })
            state.currentCellTasks.forEach(task => {
                if (task.id === action.payload.id) {
                    task.taskText = action.payload.text;
                    task.color = action.payload.color;
                }
            })
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
        changeTheme(state, action) {
            const root = document.querySelector(":root");

            const themeVariable = [
                "Color", "BgColor",
                "BorderColor", "ButtonColor",
                "ShadowColor", "HoverBgColor",
                "HoverColor", "ActiveMonthColor",
                "UnActiveMonthColor"
            ];

            themeVariable.forEach(variable => {
                root.style.setProperty(
                    `--default${variable}`,
                    `var(--${action.payload.theme}${variable}`)
            });

            state.theme = action.payload.theme;
        },
    }
});

export const {
    addTask,
    removeTask,
    editTask,
    setCurrentCell,
    changeTheme,
} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
