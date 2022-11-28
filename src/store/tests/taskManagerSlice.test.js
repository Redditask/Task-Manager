import taskReducer, {
    addTask,
    removeTask,
    editTask,
    setSelectedCell,
    changeTheme
} from "../taskManagerSlice";

//states for testing actions
const initialState = {tasks: [], selectedTasks:[], selectedDate: "", theme: ""};

const someTasks = [
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

const someState = {tasks: someTasks, selectedTasks:[someTasks[0]], selectedDate: "27-11-2021", theme: "dark"}

describe("redux slice", ()=> {
    it("should return default state when passed en empty action", () => {
        const result = taskReducer(undefined, {type: ""});

        expect(result).toEqual(initialState);
    });

    describe("action tests", () => {
        it("should add new task with 'addTask' action", () => {
            const task = {taskText: "Your task", year: 2022, month: 11, day: 28, color: "beige"};

            const action = {type: addTask, payload: task};

            const result = taskReducer(initialState, action);

            expect(result.tasks[0].taskText).toEqual("Your task");
            expect(result.tasks[0].year).toEqual(2022);
            expect(result.tasks[0].month).toEqual(11);
            expect(result.tasks[0].day).toEqual(28);
            expect(result.tasks[0].color).toEqual("beige");

            //check selectedTasks state after add new task
            expect(result.selectedTasks[0]).toBe(result.tasks[0]);
        });

        it("should remove task from state with 'removeTask' action", () => {
            const action = {type: removeTask, payload: {id: "2021-11-27T16:33:22.812Z"}};

            const result = taskReducer(someState, action);

            expect(result.tasks).not.toEqual(someState.tasks);
            expect(result.tasks).toHaveLength(1);

            expect(result.selectedTasks).not.toEqual(someState.selectedTasks);
            expect(result.selectedTasks).toHaveLength(0);
        });

        it("should edit task in state with 'editTask' action", () => {
            const action = {
                type: editTask, payload: {
                    id: "2021-11-27T16:33:22.812Z",
                    text: "New taskText",
                    color: "#00FF7F",
                }
            }

            const result = taskReducer(someState, action);

            expect(result.tasks[0].taskText).toEqual("New taskText");
            expect(result.tasks[0].color).toEqual("#00FF7F");

            expect(result.selectedTasks[0].taskText).toEqual("New taskText");
            expect(result.selectedTasks[0].color).toEqual("#00FF7F");
        });

        it("should set selectedDate with 'setSelectedDate' action", () => {
            const action = {type: setSelectedCell, payload: "17-5-2022"};

            const result = taskReducer(someState, action);

            expect(result.selectedDate).toEqual("17-5-2022");
            expect(result.selectedTasks[0]).toEqual(someState.tasks[1]);
        });

        it("should change theme with 'changeTheme' action", () => {
            const action = {type: changeTheme, payload: {theme: "light"}};

            const result = taskReducer(someState, action);

            expect(result.theme).toEqual("light");
        });
    });
});
