import styles from "./modal.module.css";
import closeImgPath from "../../images/close.svg";
import { ReactNode, useEffect } from "react";

interface IModalProps {
    children: ReactNode;
    closeHandler: () => void;
    title?: string;
    height?: string;
    width?: string;
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
    
    return (
        <article className={`${styles.modal} p-10`} style={{width: props.width, height: props.height}}>
            <div className={`${styles.header} text text_type_main-large`}>
                <p>
                    {props.title ?? ""}
                </p>
                <div className={styles.closeIcon} onClick={props.closeHandler}>
                    <img src={closeImgPath} alt="Закрыть" />
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </article>
    );
}

Modal.defaultProps = {
    width: "500px",
    height: "500px"
}
