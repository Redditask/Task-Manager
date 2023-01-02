// @ts-ignore
import styles from "./ColorPicker.module.scss";

import React, {memo} from 'react';

import {Color, TaskColor} from '../../types/types';

import {colors} from "../../utils/utils";

interface ColorPickerProps {
    color: string;
    // @ts-ignore
    setColor: (color: HTMLSelectElement.value) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = memo(({color, setColor}) => {
    const colorChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void =>
        setColor(event.target.value);

    return (
        <>
            <p className={styles.ColorPicker__title}>Theme:</p>
            <select
                title="Task color"
                defaultValue={color}
                className={styles.ColorPicker}
                onChange={colorChangeHandler}
                style={{backgroundColor: color}}
            >
                {colors.map((item: Color) =>
                    <option
                        style={{backgroundColor: item.color}}
                        value={item.color}
                        key={item.name}
                    >
                        {item.name}
                    </option>
                )}
            </select>
        </>
    );
});

export default ColorPicker;
