import React from "react";
import styles from "./modal-overlay.module.css"

interface IModalOverlayProps {
    closeHandler: () => void;
    children: JSX.Element;
}

export default function ModalOverlay(props: IModalOverlayProps) {
    
    const closeModalByClick = (event: React.MouseEvent) => {
        if ((event.target as HTMLElement).classList.contains(styles.modalOverlay)) {
            props.closeHandler();
        }
    };

    return (
        <div className={styles.modalOverlay} onMouseDown={closeModalByClick}>
            {props.children}
        </div>
    )
}