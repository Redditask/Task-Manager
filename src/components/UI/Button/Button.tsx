// @ts-ignore
import styles from "./Button.module.scss";

import React from 'react';

interface ButtonProps {
    text: React.ReactNode;
    title?: string;
    onClick?: ()=> any;
}

const Button: React.FC<ButtonProps> = ({text, ...props}) => {
    return (
        <div {...props} className={styles.Button}>
            {text}
        </div>
    );
};

export default Button;
