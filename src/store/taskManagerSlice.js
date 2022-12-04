import {createSlice, current} from "@reduxjs/toolkit";

const taskSorting = (task1, task2) => {
    return (task1.startTime.hour - task2.startTime.hour)
};

const taskManagerSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        selectedTasks: [],
        selectedDate: "",
        theme: "",
    },
    reducers: {
        addTask(state, action) {
            console.log(action.payload)

            state.tasks.push({
                id: new Date().toISOString(),
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

            state.selectedDate = action.payload.day + "-" + action.payload.month + "-" + action.payload.year;
            //console.log(current(state)) для просмотра состояния tasks
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            state.selectedTasks = state.selectedTasks.filter(task => task.id !== action.payload.id);
        },
        editTask(state, action) {
            //как-то это совместить (или переработать сам store в целом)
            //сделать так, чтобы обновлялось только то, что изменилось
            state.tasks.forEach(task => {
                if (task.id === action.payload.id) {
                    task.taskText = action.payload.text;
                    task.color = action.payload.color;
                    task.startTime = action.payload.startTime;
                    task.endTime = action.payload.endTime;
                }
            });
            state.tasks.sort(taskSorting);

            state.selectedTasks.forEach(task => {
                if (task.id === action.payload.id) {
                    task.taskText = action.payload.text;
                    task.color = action.payload.color;
                    task.startTime = action.payload.startTime;
                    task.endTime = action.payload.endTime;
                }
            });
            state.selectedTasks.sort(taskSorting);
        },
        setSelectedCell(state, action) {
            const [day, month, year] = action.payload.split("-");

            state.selectedTasks = [];
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].year === Number(year)
                    && state.tasks[i].month === Number(month)
                    && state.tasks[i].day === Number(day)) {
                    state.selectedTasks.push(state.tasks[i])
                }
            }

            state.selectedDate = action.payload;
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
    setSelectedCell,
    changeTheme,
} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
