// @ts-ignore
import styles from "./Modal.module.scss";

import React from 'react';

interface IModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const Modal: React.FC<IModalProps> = ({children, visible, setVisible}) => {

    const root = [styles.Modal];
    if(visible) root.push(styles.active);

    return (
        <div className={root.join(" ")} onClick={()=>setVisible(false)}>
            <div className={styles.ModalContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
