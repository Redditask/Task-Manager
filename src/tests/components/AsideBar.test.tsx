import {render} from "@testing-library/react";
import * as ReduxHooks from "react-redux";

import AsideBar from "../../components/AsideBar/AsideBar";

import {someTasks} from "../consts";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(ReduxHooks, "useSelector");

describe("AsideBar", ()=>{

    it("should create AsideBar with empty task list", ()=>{
        mockedUseSelector
            .mockReturnValueOnce("")
            .mockReturnValueOnce([]); //for AsideTaskList

        const component = render(
            <AsideBar
                setDate={jest.fn}
                setModalStatus={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("should create AsideBar with task list", ()=>{
        mockedUseSelector
            .mockReturnValueOnce("17-5-2022")
            .mockReturnValueOnce([someTasks[1], someTasks[2]]); //for AsideTaskList

        const component = render(
            <AsideBar
                setDate={jest.fn}
                setModalStatus={jest.fn}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
