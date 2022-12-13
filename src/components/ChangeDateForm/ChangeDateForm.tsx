// @ts-ignore
import styles from "./ChangeDateForm.module.scss";

import React from 'react';

import Button from "../UI/Button/Button";

interface IChangeDateFormProps {
    year: number;
    month: string;
    prevMonth: ()=>void;
    nextMonth: ()=>void;
}

const ChangeDateForm: React.FC<IChangeDateFormProps> = ({year, month, prevMonth, nextMonth}) => {
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
