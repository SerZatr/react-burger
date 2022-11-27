import React from "react";
import styles from "./not-found.module.css";

export default function NotFoundPage() {

    return (
        <section className={styles.notFound}>
            <p className="text text_type_digits-large"> 404 </p>
            <p className="text text_type_main-medium"> Страница не найдена </p>
        </section>
    );
}