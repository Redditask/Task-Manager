import styles from "./ChangeDateForm.module.scss";

import React from 'react';
import Button from "../../UI/Button/Button";

const ChangeDateForm = ({year, month, prevYear, nextYear, prevMonth, nextMonth}) => {
    return (
        <div  className={styles.ChangeDateForm}>
            <div className={styles.ChangeDateForm__item}>
                <Button text="<" onClick={prevYear}/>
                <p className={styles.ChangeDateForm__text}>{year}</p>
                <Button text=">" onClick={nextYear}/>
            </div>
            <div className={styles.ChangeDateForm__item}>
                <Button text="<" onClick={prevMonth}/>
                <p className={styles.ChangeDateForm__text}>{month}</p>
                <Button text=">" onClick={nextMonth}/>
            </div>
        </div>
    );
};

export default ChangeDateForm;
