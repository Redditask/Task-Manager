import styles from "./Input.module.scss"

import React from 'react';

const Input = ({...props}) => {
    return (
        <textarea className={styles.Input} {...props}/>
    );
};

export default Input;
