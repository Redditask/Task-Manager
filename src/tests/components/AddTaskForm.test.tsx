import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as api from "../../API/taskAPI";

import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("AddTaskForm", ()=>{

    it("should create AddTaskForm", ()=>{
        mockedUseSelector.mockReturnValueOnce(0);
        mockedUseDispatch.mockReturnValueOnce(jest.fn());

        const component = render(
            <AddTaskForm
                setModalStatus={jest.fn}
                date="17-5-2022"
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch thunk actions",()=>{
        mockedUseSelector.mockReturnValueOnce(2);
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValueOnce(dispatch);

        const mockedPostTask = jest.spyOn(api, "postTask");

        render(
            <AddTaskForm
                setModalStatus={jest.fn}
                date="17-5-2022"
            />
        );

        fireEvent.click(screen.getByTitle("Add task"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedPostTask).toHaveBeenCalledTimes(1);
        //standard input values
        expect(mockedPostTask).toHaveBeenCalledWith(
            {
                task: {
                    taskText: "Your task",
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
    });

    it("should properly change task data and post this",()=>{
        mockedUseSelector.mockReturnValue(2);
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);

        const mockedPostTask = jest.spyOn(api, "postTask");

        render(
            <AddTaskForm
                setModalStatus={jest.fn}
                date="17-5-2022"
            />
        );

        fireEvent.change(screen.getByTitle("Textarea"), {target: {value: "Added task text"}});
        fireEvent.change(screen.getByTitle("Start hour"), {target: {value: 20}});
        fireEvent.change(screen.getByTitle("Start minute"), {target: {value: 20}});
        fireEvent.change(screen.getByTitle("End minute"), {target: {value: 19}});
        fireEvent.change(screen.getByTitle("End hour"), {target: {value: 20}});
        fireEvent.change(screen.getByTitle("Task color"), {target: {value: "#4169E1"}});

        fireEvent.click(screen.getByTitle("Add task"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedPostTask).toHaveBeenCalledTimes(1);
        expect(mockedPostTask).toHaveBeenCalledWith(
            {
                task: {
                    taskText: "Added task text",
                    year: 2022,
                    month: 5,
                    day: 17,
                    startTime: {hour: 20, min: 20},
                    endTime: {hour: 20, min: 21},
                    color: "#4169E1",
                },
                userId: 2
            }
        );
    });
});
