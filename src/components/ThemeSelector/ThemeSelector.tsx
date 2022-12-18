// @ts-ignore
import styles from "./ThemeSelector.module.scss";

import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {changeTheme} from "../../store/taskManagerSlice";
import {selectTheme} from "../../store/selectors";

import {MdDarkMode} from "react-icons/md";
import {CiLight} from "react-icons/ci";

const ThemeSelector: React.FC = () => {
    const theme = useAppSelector(selectTheme);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(changeTheme({theme: theme}))
        //auto "return"
    }, []);

    const selectLightTheme = () => dispatch(changeTheme({theme: "light"}));
    const selectDarkTheme = () => dispatch(changeTheme({theme: "dark"}));

    return (
        <>
            {
                theme === "light"
                    ?
                    <MdDarkMode
                        title="Dark theme"
                        size={40}
                        className={styles.DarkSelector}
                        onClick={selectDarkTheme}
                    />
                    :
                    <CiLight
                        title="Light theme"
                        size={40}
                        className={styles.LightSelector}
                        onClick={selectLightTheme}
                    />
            }
        </>
    );
};

export default ThemeSelector;
