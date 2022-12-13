// @ts-ignore
import styles from "./ColorPicker.module.scss";

import React from 'react';

import {Color} from '../../types/data';

const utils = require("../../utils/utils");

interface IColorPickerProps {
    color: string;
    setColor: (color: string) => void;
}

const ColorPicker: React.FC<IColorPickerProps> = ({color, setColor}) => {
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
                {utils.colors.map((item: Color)=>
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
