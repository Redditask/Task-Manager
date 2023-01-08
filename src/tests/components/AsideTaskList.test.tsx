import {render} from "@testing-library/react";
import * as ReduxHooks from "react-redux";

import AsideTaskList from "../../components/AsideTaskList/AsideTaskList";

import {someTasks} from "../consts";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("AsideTaskList", ()=>{

    it("should create TaskList with empty selected task list", ()=>{
        mockedUseSelector.mockReturnValueOnce([]);

        const component = render(
            <AsideTaskList
                setEditModalStatus={jest.fn}
                setSelectedTask={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should create TaskList with selected task list", ()=>{
        mockedUseSelector.mockReturnValueOnce([someTasks[1], someTasks[2]]);

        const component = render(
            <AsideTaskList
                setEditModalStatus={jest.fn}
                setSelectedTask={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
