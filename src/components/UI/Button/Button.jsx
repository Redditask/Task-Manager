import styles from "./Button.module.scss";

import React from 'react';

const Button = ({text, ...props}) => {
    return (
        <div {...props} className={styles.Button}>
            {text}
        </div>
    );
};

export default Button;
