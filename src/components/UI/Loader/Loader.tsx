import styles from "./Loader.module.scss";

import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className={styles.Loader} title="Loading..."/>
    );
};

export default Loader;
