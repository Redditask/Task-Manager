import {render} from "@testing-library/react";
import * as ReduxHooks from "react-redux";

import AsideBar from "../AsideBar/AsideBar";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

const someTasks = [
    {
        id: "2021-11-27T16:33:22.812Z",
        taskText: "Your task",
        year: 2022,
        month: 5,
        day: 17,
        startTime: {hour: 3, min: 14},
        endTime: {hour: 23, min: 5},
        color: "beige",
    },
    {
        id: "2022-5-17T16:33:22.812Z",
        taskText: "Your task",
        year: 2022,
        month: 5,
        day: 17,
        startTime: {hour: 13, min: 8},
        endTime: {hour: 14, min: 25},
        color: "#00FF7F",
    }
];

describe("AsideBar", ()=>{

    it("should create AsideBar with empty task list", ()=>{
        mockedUseSelector.mockReturnValue([]);

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const component = render(<AsideBar/>);

        expect(component).toMatchSnapshot();
    });

    it("should create AsideBar with tasks", ()=>{
        mockedUseSelector
            .mockReturnValueOnce("18-5-2022")
            .mockReturnValueOnce(someTasks); //for AsideTaskList

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const component = render(
            <AsideBar
                setDate={jest.fn()}
                setModalStatus={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
