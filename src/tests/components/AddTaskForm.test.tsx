import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";

import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");

describe("AddTaskForm", ()=>{
    // @ts-ignore
    it("should create AddTaskForm", ()=>{
        mockedUseDispatch.mockReturnValue(jest.fn());

        const component = render(
            <AddTaskForm
                setModalStatus={jest.fn()}
                date="18-5-2022"
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch actions",()=>{
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);

        const mockedAddTask = jest.spyOn(actions, "addTask");

        render(
            <AddTaskForm
                setModalStatus={jest.fn()}
                date="18-5-2022"
            />
        );

        fireEvent.click(screen.getByTitle("Add task"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedAddTask).toHaveBeenCalledTimes(1);
        //standard input values
        expect(mockedAddTask).toHaveBeenCalledWith(
            {
                taskText: "Your task",
                year: 2022,
                month: 5,
                day: 18,
                startTime: {hour: 0, min: 0},
                endTime: {hour: 23, min: 59},
                color: "beige",
            }
        );
    });
});