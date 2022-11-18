import styles from "./Select.module.scss";

import React from 'react';

const Select = ({color, setColor}) => {
    return (
        <select
            title="Task color"
            className={styles.Select}
            onChange={event => setColor(event.target.value)}
            style={{backgroundColor:color}}
        >
            <option style={{backgroundColor:"beige"}} value="beige">beige</option>
            <option style={{backgroundColor:"#00FF7F"}} value="#00FF7F">green</option>
            <option style={{backgroundColor:"#CD5C5CFF"}} value="#CD5C5CFF">red</option>
            <option style={{backgroundColor:"#C0C0C0"}} value="#C0C0C0">silver</option>
            <option style={{backgroundColor:"#4169E1"}} value="#4169E1">blue</option>
        </select>
    );
};

export default Select;
