import styles from "./Modal.module.scss";

import React from 'react';

interface ModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({children, visible, setVisible}) => {

    const root = [styles.Modal];
    if (visible) root.push(styles.active);

    const closeModal = (): void => setVisible(false);
    const stopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => event.stopPropagation();

    return (
        <div className={root.join(" ")} onClick={closeModal}>
            <div className={styles.ModalContent} onClick={stopPropagation}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
