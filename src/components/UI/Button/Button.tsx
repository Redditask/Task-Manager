// @ts-ignore
import styles from "./Button.module.scss";

import React from 'react';

interface IButtonProps {
    text: React.ReactNode;
    title?: string;
    onClick?: ()=>void;
}

const Button: React.FC<IButtonProps> = ({text, ...props}) => {
    return (
        <div {...props} className={styles.Button}>
            {text}
        </div>
    );
};

export default Button;
