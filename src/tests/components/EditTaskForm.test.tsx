import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";

import EditTaskForm from "../../components/EditTaskForm/EditTaskForm";

import {Task} from "../../types/data";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");

const someTask: Task = {
    id: "2021-11-27T16:33:22.812Z",
    taskText: "Your task",
    year: 2022,
    month: 5,
    day: 18,
    startTime: {hour: 23, min: 2},
    endTime: {hour: 23, min: 5},
    color: "beige"
};
describe("EditTaskForm", ()=>{
    it("should create EditTaskForm", ()=>{
        mockedUseDispatch.mockReturnValue(jest.fn());

        const component = render(
            <EditTaskForm
                setEditModalStatus={jest.fn()}
                selectedTask={someTask}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch actions",()=>{
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);

        const mockedEditTask = jest.spyOn(actions, "editTask");

        render(
            <EditTaskForm
                setEditModalStatus={jest.fn()}
                selectedTask={someTask}
            />
        );

        fireEvent.change(screen.getByTitle("Input"), {target: {value: "New task text!!!"}});
        fireEvent.change(screen.getByTitle("Start hour"), {target: {value: 15}});
        fireEvent.change(screen.getByTitle("Start minute"), {target: {value: 15}});
        fireEvent.change(screen.getByTitle("Task color"), {target: {value: "#4169E1"}});

        fireEvent.click(screen.getByTitle("Edit"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedEditTask).toHaveBeenCalledTimes(1);
        expect(mockedEditTask).toHaveBeenCalledWith(
            {
                id: "2021-11-27T16:33:22.812Z",
                taskText: "New task text!!!",
                startTime: {hour: 15, min: 15},
                endTime: {hour: 23, min: 5},
                color: "#4169E1",
            }
        );
    });
});
