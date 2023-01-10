import {
    selectError, selectLoadingStatus,
    selectSelectedDate,
    selectSelectedTasks,
    selectTasks,
    selectTheme,
    selectUserId
} from "../../store/selectors";

import {anotherState, initialState, someState} from "../consts";

describe("redux selectors", ()=> {

    describe("task selector", () => {

        it("should select empty tasks array from initial state", () => {
            const result = selectTasks({tasks: initialState});

            expect(result).toEqual(initialState.tasks);
        });

        it("should select tasks array from state", () => {
            const result = selectTasks({tasks: someState});

            expect(result).toEqual(someState.tasks);
        });
    });

    describe("selected task selector", () => {

        it("should select empty selected tasks array from initial state", () => {
            const result = selectSelectedTasks({tasks: initialState});

            expect(result).toEqual(initialState.selectedTasks);
        });

        it("should select selected tasks array from state", () => {
            const result = selectSelectedTasks({tasks: someState});

            expect(result).toEqual(someState.selectedTasks);
        });
    });

    describe("selected date selector", () => {

        it("should select null date from initial state", () => {
            const result = selectSelectedDate({tasks: initialState});

            expect(result).toEqual(initialState.selectedDate);
        });

        it("should select selected date from state", () => {
            const result = selectSelectedDate({tasks: someState});

            expect(result).toEqual(someState.selectedDate);
        });
    });

    describe("theme selector", () => {

        it("should select theme from state", () => {
            const result = selectTheme({tasks: someState});

            expect(result).toEqual(someState.theme);
        });
    });

    describe("userId selector", () => {

        it("should select null userId from initial state", () => {
            const result = selectUserId({tasks: initialState});

            expect(result).toEqual(initialState.userId);
        });

        it("should select userId from state", () => {
            const result = selectUserId({tasks: someState});

            expect(result).toEqual(someState.userId);
        });
    });

    describe("error selector", () => {

        it("should select null error from initial state", () => {
            const result = selectError({tasks: initialState});

            expect(result).toEqual(initialState.error);
        });

        it("should select error from state", () => {
            const result = selectError({tasks: anotherState});

            expect(result).toEqual(anotherState.error);
        });
    });

    describe("isLoading selector", () => {

        it("should select false loading status from initial state", () => {
            const result = selectLoadingStatus({tasks: initialState});

            expect(result).toEqual(initialState.isLoading);
        });

        it("should select true loading status from state", () => {
            const result = selectLoadingStatus({tasks: anotherState});

            expect(result).toEqual(anotherState.isLoading);
        });
    });
});
