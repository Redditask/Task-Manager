import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";

import CalendarCell from "../../components/CalendarCell/CalendarCell";

import {Task} from "../../types/data";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

const someTask: Task = {
    id: "2021-11-27T16:33:22.812Z",
    taskText: "Your task",
    year: 2022,
    month: 5,
    day: 18,
    startTime: {hour: 13, min: 8},
    endTime: {hour: 14, min: 25},
    color: "beige"
};

describe("CalendarCell", ()=>{
    it("should create CalendarCell", ()=>{
        mockedUseDispatch.mockReturnValue(jest.fn());
        mockedUseSelector.mockReturnValue([]); //for children component CalendarTaskList

        const component = render(
            <CalendarCell
                data={{day: 17, month: 5, year: 2022}}
                className=""
                setDate={jest.fn()}
                setModalStatus={jest.fn()}
                dropTask={someTask}
                setDropTask={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch actions", ()=>{
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseSelector.mockReturnValue([]); //for children component CalendarTaskList

        const mockedSetSelectedCell = jest.spyOn(actions, "setSelectedCell");
        const mockedRemoveTask = jest.spyOn(actions, "removeTask");
        const mockedAddTask = jest.spyOn(actions, "addTask");

        render(
            <CalendarCell
                data={{day: 17, month: 5, year: 2022}}
                className=""
                setDate={jest.fn()}
                setModalStatus={jest.fn()}
                dropTask={someTask}
                setDropTask={jest.fn()}
            />
        );

        // eslint-disable-next-line no-restricted-globals
        fireEvent.click(screen.getByTitle("Cell"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedSetSelectedCell).toHaveBeenCalledWith("17-5-2022");

        fireEvent.drop(screen.getByTitle("Cell"));

        expect(mockedRemoveTask).toHaveBeenCalledTimes(1);
        expect(mockedRemoveTask).toHaveBeenCalledWith({id: someTask.id});

        expect(mockedAddTask).toHaveBeenCalledTimes(1);
        expect(mockedAddTask).toHaveBeenCalledWith(
            {
                taskText: "Your task",
                year: 2022,
                month: 5,
                day: 17,
                startTime: {hour: 13, min: 8},
                endTime: {hour: 14, min: 25},
                color: "beige",
            }
        );

        expect(dispatch).toHaveBeenCalledTimes(3);
    });
});
