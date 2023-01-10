import {fireEvent, render, screen} from "@testing-library/react";
import * as ReduxHooks from "react-redux";
import * as actions from "../../store/taskManagerSlice";

import Calendar from "../../components/Calendar/Calendar";

jest.mock("react-redux");

const mockedUseDispatch = jest.spyOn(ReduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");
describe("Calendar", ()=>{

    it("should create Calendar", ()=>{
        // for child components
        mockedUseSelector.mockReturnValue([]);
        mockedUseDispatch.mockReturnValue(jest.fn());

        // empty implementation window.alert for jest
        window.prompt = () => "Error";

        const component = render(
            <Calendar
                setDate={jest.fn}
                setModalStatus={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should dispatch thunk actions", ()=>{
        const dispatch = jest.fn();
        // for child components
        mockedUseSelector.mockReturnValue([]);
        mockedUseDispatch.mockReturnValue(dispatch);

        // empty implementation window.alert for jest
        window.alert = () => "Server error";

        const mockedSetTheme = jest.spyOn(actions, "setTheme");
        const mockedSetUserId = jest.spyOn(actions, "setUserId");

        render(
            <Calendar
                setDate={jest.fn}
                setModalStatus={jest.fn}
            />
        );

        fireEvent.click(screen.getByTitle("Out"));
        expect(mockedSetUserId).toHaveBeenCalledTimes(1);
        expect(mockedSetUserId).toHaveBeenCalledWith({userId: null});
        expect(mockedSetTheme).toHaveBeenCalledTimes(2); // 1 extra from child component
        expect(mockedSetTheme).toHaveBeenCalledWith({theme: "light"});
        expect(dispatch).toHaveBeenCalledTimes(3); // 1 extra from child component
    });
});
