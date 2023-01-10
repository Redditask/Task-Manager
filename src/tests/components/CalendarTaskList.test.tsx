import {render} from "@testing-library/react";
import * as ReduxHooks from "react-redux";

import CalendarTaskList from "../../components/CalendarTaskList/CalendarTaskList";

import {someTasks} from "../consts";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("CalendarTaskList", ()=>{

    it("should create TaskList with empty task list", ()=>{
        mockedUseSelector.mockReturnValueOnce([]);

        const component = render(
            <CalendarTaskList
                date={{day: 0, month: 0, year: 0}}
                setDropTask={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should create TaskList with tasks", ()=>{
        mockedUseSelector.mockReturnValueOnce(someTasks);

        const component = render(
            <CalendarTaskList
                date={{day: 17, month: 5, year: 2022}}
                setDropTask={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
