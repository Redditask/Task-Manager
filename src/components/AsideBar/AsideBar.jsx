import styles from "./AsideBar.module.scss";

import React from 'react';
import {useSelector} from "react-redux";

const AsideBar = () => {
    //тут доработать
    const currentCell = useSelector(state => state.tasks.currentCell);
    console.log(currentCell)

    return (
        <div className={styles.AsideBar}>
            {currentCell.taskText}
        </div>
    );
};

export default AsideBar;
