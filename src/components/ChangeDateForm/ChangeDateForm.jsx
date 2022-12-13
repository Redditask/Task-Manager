import styles from "./ChangeDateForm.module.scss";

import React from 'react';

import Button from "../UI/Button/Button";

const ChangeDateForm = ({year, month, prevMonth, nextMonth}) => {
    return (
        <div  className={styles.ChangeDateForm}>
            <div className={styles.ChangeDateForm__switch}>
                <Button text="<" onClick={prevMonth}/>
                <div className={styles.ChangeDateForm__text}>
                    {year} / {month}
                </div>
                <Button text=">" onClick={nextMonth}/>
            </div>
        </div>
    );
};

export default ChangeDateForm;
