// @ts-ignore
import styles from "./Textarea.module.scss"

import React from 'react';

import {StringChangeEvent} from "../../../types/types";

interface TextareaProps {
    value?: string;
    onChange?: (event: StringChangeEvent) => void;
}

const Textarea: React.FC<TextareaProps> = ({value, onChange}) => {
    return (
        <textarea title="Textarea" className={styles.Textarea} value={value} onChange={onChange}/>
    );
};

export default Textarea;
