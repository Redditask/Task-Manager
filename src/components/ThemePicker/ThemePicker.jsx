import styles from "./ThemePicker.module.scss";

import React from 'react';
import "./utils/utils";
import {colors} from "./utils/utils";

const ThemePicker = ({color, setColor}) => {
    return (
        <select
            title="Task color"
            className={styles.ThemePicker}
            onChange={event => setColor(event.target.value)}
            style={{backgroundColor:color}}
        >
            {colors.map((item)=>
                <option style={{backgroundColor: item.color}} value={item.color}>{item.name}</option>
            )}
        </select>
    );
};

export default ThemePicker;
