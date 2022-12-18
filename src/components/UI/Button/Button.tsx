// @ts-ignore
import styles from "./Button.module.scss";

import React from 'react';
import {PayloadAction} from "@reduxjs/toolkit";

interface ButtonProps {
    text: React.ReactNode;
    title?: string;
    onClick?: ()=>void;
}

const Button: React.FC<ButtonProps> = ({text, ...props}) => {
    return (
        <div {...props} className={styles.Button}>
            {text}
        </div>
    );
};

export default Button;
