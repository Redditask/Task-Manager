import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as api from "../../API/taskAPI";

import AsideTask from "../../components/AsideTask/AsideTask";

import {someTask} from "../consts";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("AsideTask", ()=>{

    it("should create AsideTask", ()=>{
        mockedUseSelector.mockReturnValueOnce(0);
        mockedUseDispatch.mockReturnValueOnce(jest.fn());

        const component = render(
            <AsideTask
                task={someTask}
                setTask={jest.fn}
                setEditModalStatus={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch thunk actions",()=>{
        mockedUseSelector.mockReturnValueOnce(2);
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValueOnce(dispatch);

        const mockedDeleteTask = jest.spyOn(api, "deleteTask");

        render(
            <AsideTask
                task={someTask}
                setTask={jest.fn}
                setEditModalStatus={jest.fn}
            />
        );

        fireEvent.click(screen.getByTitle("Remove"));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedDeleteTask).toHaveBeenCalledTimes(1);
        expect(mockedDeleteTask).toHaveBeenCalledWith({id: someTask.id, userId: 2});
    });
});
