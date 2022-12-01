import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";
import AsideTask from "../AsideBar/SupportComponents/AsideTask/AsideTask";

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

describe("AsideTask", ()=>{
    if("should create AsideTask", ()=>{
        mockedUseDispatch.mockReturnValue(jest.fn());

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const component = render(
            <AsideTask
                task={someTask}
                setTask={jest.fn()}
                setEditModalStatus={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch actions",()=>{
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);

        const mockedRemoveTask = jest.spyOn(actions, "removeTask");

        render(
            <AsideTask
                task={someTask}
                setTask={jest.fn()}
                setEditModalStatus={jest.fn()}
            />
        );

        fireEvent.click(screen.getByTitle("Remove"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedRemoveTask).toHaveBeenCalledTimes(1);
        expect(mockedRemoveTask).toHaveBeenCalledWith({id: "2021-11-27T16:33:22.812Z"});
    });
});
