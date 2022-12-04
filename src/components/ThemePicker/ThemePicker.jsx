import styles from "./ThemePicker.module.scss";

import React from 'react';
import "./utils/utils";
import {colors} from "./utils/utils";

const ThemePicker = ({color, setColor}) => {
    return (
        <div>
            <p className={styles.ThemePicker__title}>Theme:</p>
            <select
                title="Task color"
                defaultValue={color}
                className={styles.ThemePicker}
                onChange={event => setColor(event.target.value)}
                style={{backgroundColor:color}}
            >
                {colors.map((item)=>
                    <option
                        style={{backgroundColor: item.color}}
                        value={item.color}
                        key={item.name}
                    >
                        {item.name}
                    </option>
                )}
            </select>
        </div>
    );
};

export default ThemePicker;
