import styles from "./ColorPicker.module.scss";

import React from 'react';
import "./utils/utils";

const utils = require("../../utils/utils");

const ColorPicker = ({color, setColor}) => {
    return (
        <div>
            <p className={styles.ColorPicker__title}>Theme:</p>
            <select
                title="Task color"
                defaultValue={color}
                className={styles.ColorPicker}
                onChange={event => setColor(event.target.value)}
                style={{backgroundColor:color}}
            >
                {utils.colors.map((item)=>
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

export default ColorPicker;
