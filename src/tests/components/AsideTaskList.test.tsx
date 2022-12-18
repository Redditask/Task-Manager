import {render} from "@testing-library/react";
import * as ReduxHooks from "react-redux";

import AsideTaskList from "../../components/AsideTaskList/AsideTaskList";

import {Task} from "../../types/data";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

const someTasks: Task[] = [
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

describe("AsideTaskList", ()=>{
    it("should create TaskList with empty task list", ()=>{
        mockedUseSelector.mockReturnValue([]);

        const component = render(
            <AsideTaskList
                setEditModalStatus={jest.fn()}
                setSelectedTask={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should create TaskList with tasks", ()=>{
        mockedUseSelector.mockReturnValue(someTasks);

        const component = render(
            <AsideTaskList
                setEditModalStatus={jest.fn()}
                setSelectedTask={jest.fn()}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
