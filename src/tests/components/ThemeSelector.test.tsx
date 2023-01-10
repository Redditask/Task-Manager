import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";

import ThemeSelector from "../../components/ThemeSelector/ThemeSelector";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("ThemeSelector", ()=>{

    it("should create ThemeSelector", ()=>{
        mockedUseDispatch.mockReturnValueOnce(jest.fn());
        mockedUseSelector.mockReturnValueOnce("light");

        const component = render(
            <ThemeSelector/>
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch actions to change light theme", ()=>{
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseSelector.mockReturnValue("light")

        const mockedSetTheme = jest.spyOn(actions, "setTheme");

        render(
            <ThemeSelector/>
        );

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedSetTheme).toHaveBeenCalledWith({theme: "light"});

        fireEvent.click(screen.getByTitle("Dark theme"));
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockedSetTheme).toHaveBeenCalledWith({theme: "dark"});
    });

    it("should dispatch actions to change dark theme", ()=>{
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseSelector.mockReturnValue("dark")

        const mockedSetTheme = jest.spyOn(actions, "setTheme");

        render(
            <ThemeSelector/>
        );

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedSetTheme).toHaveBeenCalledWith({theme: "dark"});

        fireEvent.click(screen.getByTitle("Light theme"));
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockedSetTheme).toHaveBeenCalledWith({theme: "light"});
    });
});
