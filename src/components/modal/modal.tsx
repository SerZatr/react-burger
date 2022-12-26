import styles from "./modal.module.css";

import { ReactNode, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
    children?: ReactNode;
    closeHandler: () => void;
    title?: string;
}

export default function Modal(props: IModalProps) {

    const closeHandler = props.closeHandler;

    useEffect(() => {
        const closeModalByKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeHandler();
            }
        };
        document.addEventListener("keyup", closeModalByKey);
        return () => document.removeEventListener("keyup", closeModalByKey);
    }, [closeHandler]);
    
    return createPortal (
        <ModalOverlay closeHandler={props.closeHandler}>
            <article className={`${styles.modal} p-10`}>
                <div className={`${styles.header} text text_type_main-large`}>
                    <p>
                        {props.title ?? ""}
                    </p>
                    <div
                        className={styles.closeIcon}
                        onClick={props.closeHandler}
                        data-cy="closeModalIcon"
                    >
                        <CloseIcon type={"primary"} />
                    </div>
                </div>
                <div>
                    {props.children ?? ""}
                </div>
            </article>
        </ModalOverlay>,
        document.getElementById("modal") as HTMLElement
    );
}
