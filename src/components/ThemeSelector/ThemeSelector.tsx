import styles from "./ThemeSelector.module.scss";

import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {PayloadAction} from "@reduxjs/toolkit";
import {setTheme} from "../../store/taskManagerSlice";
import {selectTheme} from "../../store/selectors";

import {MdDarkMode} from "react-icons/md";
import {CiLight} from "react-icons/ci";
import {Theme} from "../../types/types";

const ThemeSelector: React.FC = () => {
    const theme: Theme = useAppSelector(selectTheme);

    const dispatch = useAppDispatch();
    useEffect((): void => {
        dispatch(setTheme({theme: theme}))
    }, []);

    const selectLightTheme = (): PayloadAction<{theme: Theme}> => dispatch(setTheme({theme: "light"}));
    const selectDarkTheme = (): PayloadAction<{theme: Theme}> => dispatch(setTheme({theme: "dark"}));

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
