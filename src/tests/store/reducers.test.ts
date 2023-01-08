import taskReducer, {setTheme, setSelectedCell, setUserId} from "../../store/taskManagerSlice";

import {anotherState, initialState, someState} from "../consts";

describe("redux slice (reducers)", ()=>{

    it("should return initial state, when passed an empty action", ()=>{
        const result = taskReducer(undefined, {type: ""});

        expect(result).toEqual(initialState);
    });

    describe("reducers", ()=>{

        it("should set cell with 'setSelectedCell' action", ()=>{
            const action = {type: setSelectedCell, payload: {date: "17-5-2022"}};

            const result = taskReducer(anotherState, action);

            expect(result.selectedDate).toEqual("17-5-2022");
            expect(result.selectedTasks).toEqual([anotherState.tasks[1], anotherState.tasks[2]]);
        });

        it("should change theme with 'setTheme' action", ()=>{
            const action = {type: setTheme, payload: {theme: "dark"}};

            const result = taskReducer(someState, action);

            expect(result.theme).toEqual("dark");

            const anotherAction = {type: setTheme, payload: {theme: "light"}};

            const anotherResult = taskReducer(result, anotherAction);

            expect(anotherResult.theme).toEqual("light");
        });

        it("should set userId with 'setUserId' action", ()=>{
            const action = {type: setUserId, payload: {userId: 5}};

            const result = taskReducer(someState, action);

            expect(result.userId).toEqual(5);
        });
    });
});
