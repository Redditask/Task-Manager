import styles from "./ThemeSelector.module.scss";

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../../../../store/taskManagerSlice";
import {selectTheme} from "../../../../store/selectors";

import {MdDarkMode} from "react-icons/md";
import {CiLight} from "react-icons/ci";

const ThemeSelector = () => {
    const theme = useSelector(selectTheme) || "light";

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(changeTheme({theme: theme}))
        //auto "return"
    }, []);

    return (
        <div>
            {
                theme === "light"
                    ? <MdDarkMode
                        title="Dark theme"
                        size={40}
                        className={styles.DarkSelector}
                        onClick={() => dispatch(changeTheme({theme: "dark"}))}
                    />
                    :
                    <CiLight
                        title="Light theme"
                        size={40}
                        className={styles.LightSelector}
                        onClick={() => dispatch(changeTheme({theme: "light"}))}
                    />

            }
        </div>
    );
};

export default ThemeSelector;
