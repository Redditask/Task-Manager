import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";
import * as api from "../../API/taskAPI";

import CalendarCell from "../../components/CalendarCell/CalendarCell";

import {someTask} from "../consts";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("CalendarCell", ()=>{

    it("should create CalendarCell", ()=>{
        mockedUseDispatch.mockReturnValueOnce(jest.fn());
        mockedUseSelector
            .mockReturnValueOnce(0)
            .mockReturnValueOnce([]); //for children component CalendarTaskList

        const component = render(
            <CalendarCell
                data={{day: 17, month: 5, year: 2022}}
                className="styles.Calendar__activeMonth"
                setDate={jest.fn}
                setModalStatus={jest.fn}
                dropTask={someTask}
                setDropTask={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch thunk actions", ()=>{
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseSelector
            .mockReturnValueOnce(2)
            .mockReturnValue([]); //for children component CalendarTaskList

        const mockedSetSelectedCell = jest.spyOn(actions, "setSelectedCell");
        const mockedDeleteTask = jest.spyOn(api, "deleteTask");
        const mockedPostTask = jest.spyOn(api, "postTask");

        render(
            <CalendarCell
                data={{day: 17, month: 5, year: 2022}}
                className="styles.Calendar__activeMonth"
                setDate={jest.fn}
                setModalStatus={jest.fn}
                dropTask={someTask}
                setDropTask={jest.fn}
            />
        );

        fireEvent.click(screen.getByTitle("Cell"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedSetSelectedCell).toHaveBeenCalledWith("17-5-2022");

        fireEvent.drop(screen.getByTitle("Cell"));

        expect(mockedDeleteTask).toHaveBeenCalledTimes(1);
        expect(mockedDeleteTask).toHaveBeenCalledWith({id: someTask.id, userId: 2});

        expect(mockedPostTask).toHaveBeenCalledTimes(1);
        expect(mockedPostTask).toHaveBeenCalledWith(
            {
                task: {
                    taskText: "Your some task",
                    year: 2022,
                    month: 5,
                    day: 17,
                    startTime: {hour: 0, min: 0},
                    endTime: {hour: 23, min: 59},
                    color: "beige",
                },
                userId: 2
            }
        );

        expect(dispatch).toHaveBeenCalledTimes(3);
    });
});
