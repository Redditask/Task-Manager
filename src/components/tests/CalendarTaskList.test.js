import {render} from "@testing-library/react";
import * as ReduxHooks from "react-redux";

import CalendarTaskList from "../Calendar/SupportComponents/CalendarTaskList/CalendarTaskList";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

const someTasks = [
    {
        id: "2021-11-27T16:33:22.812Z",
        taskText: "Your task",
        year: 2022,
        month: 5,
        day: 17,
        color: "beige"
    },
    {
        id: "2022-5-17T16:33:22.812Z",
        taskText: "Your task",
        year: 2022,
        month: 5,
        day: 17,
        color: "#00FF7F"
    }
];

describe("CalendarTaskList", ()=>{
    it("should create TaskList with empty task list", ()=>{
        mockedUseSelector.mockReturnValue([]);

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const component = render(<CalendarTaskList/>);

        expect(component).toMatchSnapshot();
    });

    it("should create TaskList with tasks", ()=>{
        mockedUseSelector.mockReturnValue(someTasks);

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const component = render(
            <CalendarTaskList
                data={{day: 17, month: 5, year: 2022}}
                setDropTask={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
