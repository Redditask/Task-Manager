import {selectTasks, selectTheme, selectSelectedDate, selectSelectedTasks} from "../selectors";

describe("redux selectors", ()=>{

    describe("tasks selector", ()=>{
        it("should select tasks initialState from state object", ()=>{
            const tasks = [];

            const result = selectTasks({tasks:{tasks, theme:"light"}});

            expect(result).toEqual(tasks);
        });

        it("should select tasks from state object", ()=>{
            const tasks = [
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task",
                    year: 2021,
                    month: 11,
                    day: 27,
                    color: "beige"
                },
                {
                    id: "2022-5-17T16:33:22.812Z",
                    taskText: "Your task",
                    year: 2022,
                    month: 5,
                    day: 17,
                    color: "#00FF7F"
                }
            ];

            const result = selectTasks({tasks:{tasks, theme:"dark"}});

            expect(result).toEqual(tasks);
        });

        //... more ...
    });

    describe("theme selector", ()=>{
        it("should select theme from state object", ()=>{
            const theme = "dark";

            const result = selectTheme({tasks: {tasks:[], theme:"dark"}});

            expect(result).toEqual(theme);
        });

        it("should select empty state from state object", ()=>{
            const theme = "";

            const result = selectTheme({tasks:{tasks:[], theme:theme}});

            expect(result).toEqual("");
        });

        //... more ...
    });

    describe("selected tasks selector", ()=>{
        it("should select selectedTasks from state object", ()=>{
            const tasks = [
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task",
                    year: 2021,
                    month: 11,
                    day: 27,
                    color: "beige"
                },
                {
                    id: "2022-5-17T16:33:22.812Z",
                    taskText: "Your task",
                    year: 2022,
                    month: 5,
                    day: 17,
                    color: "#00FF7F"
                },
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task 2",
                    year: 2021,
                    month: 11,
                    day: 27,
                    color: "beige"
                }
            ];

            const selectedTasks = [
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task",
                    year: 2021,
                    month: 11,
                    day: 27,
                    color: "beige"
                },
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task 2",
                    year: 2021,
                    month: 11,
                    day: 27,
                    color: "beige"
                }
            ];

            const result = selectSelectedTasks({tasks: {tasks, theme:"dark", selectedTasks}});

            expect(result).toEqual(selectedTasks);
        });

        //... more ...
    });

    describe("selected date selector", ()=>{
        it("should select selectedDate from state object", ()=>{
            const selectedTasks = [
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task",
                    year: 2021,
                    month: 11,
                    day: 27,
                    color: "beige"
                },
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task 2",
                    year: 2021,
                    month: 11,
                    day: 27,
                    color: "beige"
                }
            ];

            const result = selectSelectedDate({tasks: {tasks: selectedTasks, theme:"light", selectedTasks, selectedDate:selectedTasks[0].day+"-"+selectedTasks[0].month+"-"+selectedTasks[0].year}});

            expect(result).toEqual("27-11-2021");
        });

        it("should select empty selectedDate from state object", ()=>{
            const selectedTasks = [
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task",
                    year: 2021,
                    month: 12,
                    day: 27,
                    color: "beige"
                },
                {
                    id: "2021-11-27T16:33:22.812Z",
                    taskText: "Your task 2",
                    year: 2023,
                    month: 10,
                    day: 13,
                    color: "beige"
                }
            ];

            const result = selectSelectedDate({tasks: {tasks: selectedTasks, theme:"light", selectedTasks, selectedDate:""}});

            expect(result).toEqual("");
        });
    });
});
