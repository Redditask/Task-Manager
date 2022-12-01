import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";

import EditTaskForm from "../EditTaskForm/EditTaskForm";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");

const someTask = {
    id: "2021-11-27T16:33:22.812Z",
    taskText: "Your task",
    year: 2022,
    month: 5,
    day: 18,
    color: "beige"
};
describe("EditTaskForm", ()=>{
    if("should create EditTaskForm", ()=>{
        mockedUseDispatch.mockReturnValue(jest.fn());

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const component = render(
            <EditTaskForm
                setModalStatus={jest.fn()}
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

        fireEvent.click(screen.getByTitle("Edit"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedEditTask).toHaveBeenCalledTimes(1);
        expect(mockedEditTask).toHaveBeenCalledWith(
            {
                id: "2021-11-27T16:33:22.812Z",
                text: "Your task",
                color: "beige"
            }
        );
    });
});
