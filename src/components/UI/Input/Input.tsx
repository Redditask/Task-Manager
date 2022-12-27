// @ts-ignore
import styles from "./Input.module.scss";

import React from 'react';

import {StringChangeEvent} from "../../../types/types";

interface InputProps {
    value: string,
    onChange: (event: StringChangeEvent) => void;
    type: string;
}

const Input: React.FC<InputProps> = ({value, onChange, type}) => {
    return (
        <input
            title="input"
            className={styles.Input}
            value={value}
            onChange={onChange}
            type={type}
        />
    );
};

export default Input;
