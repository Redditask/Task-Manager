import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as api from "../../API/taskAPI";

import EditTaskForm from "../../components/EditTaskForm/EditTaskForm";

import {someTask} from "../consts";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("EditTaskForm", ()=>{

    it("should create EditTaskForm", ()=>{
        mockedUseSelector.mockReturnValue(0);
        mockedUseDispatch.mockReturnValue(jest.fn());

        const component = render(
            <EditTaskForm
                setEditModalStatus={jest.fn}
                selectedTask={someTask}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch thunk actions",()=>{
        mockedUseSelector.mockReturnValue(2);
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);

        const mockedPutTask = jest.spyOn(api, "updateTask");

        render(
            <EditTaskForm
                setEditModalStatus={jest.fn}
                selectedTask={someTask}
            />
        );

        fireEvent.change(screen.getByTitle("Textarea"), {target: {value: "New task text!!!"}});
        fireEvent.change(screen.getByTitle("Start hour"), {target: {value: 15}});
        fireEvent.change(screen.getByTitle("Start minute"), {target: {value: 15}});
        fireEvent.change(screen.getByTitle("Task color"), {target: {value: "#4169E1"}});

        fireEvent.click(screen.getByTitle("Edit"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedPutTask).toHaveBeenCalledTimes(1);
        expect(mockedPutTask).toHaveBeenCalledWith(
            {
                task: {
                    id: "2021-11-28T16:33:22.820Z",
                    taskText: "New task text!!!",
                    startTime: {hour: 15, min: 15},
                    endTime: {hour: 23, min: 59},
                    color: "#4169E1"
                },
                userId: 2
            }
        );
    });

    it("should properly changed time",()=>{
        mockedUseSelector.mockReturnValue(2);
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);

        const mockedPutTask = jest.spyOn(api, "updateTask");

        render(
            <EditTaskForm
                setEditModalStatus={jest.fn}
                selectedTask={someTask}
            />
        );

        fireEvent.change(screen.getByTitle("Start hour"), {target: {value: 8}});
        fireEvent.change(screen.getByTitle("Start minute"), {target: {value: 12}});
        fireEvent.change(screen.getByTitle("End minute"), {target: {value: 10}});
        fireEvent.change(screen.getByTitle("End hour"), {target: {value: 8}});

        fireEvent.click(screen.getByTitle("Edit"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedPutTask).toHaveBeenCalledTimes(1);
        expect(mockedPutTask).toHaveBeenCalledWith(
            {
                task: {
                    id: "2021-11-28T16:33:22.820Z",
                    taskText: "Your some task",
                    startTime: {hour: 8, min: 12},
                    endTime: {hour: 8, min: 13},
                    color: "beige",
                },
                userId: 2
            }
        );
    });
});
