// @ts-ignore
import styles from "./Input.module.scss"

import React from 'react';

import {StringChangeEvent} from "../../../types/data";

interface IInputProps {
    value?: string;
    onChange?: (event: StringChangeEvent) => void;
}

const Input:React.FC<IInputProps> = ({value, onChange}) => {
    return (
        <textarea title="Input" className={styles.Input} value={value} onChange={onChange}/>
    );
};

export default Input;