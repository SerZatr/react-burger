import React, { useEffect, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import mainStyles from "../components/app/app.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restoreClear, restorePassword } from "../services/actions/restore-password";
import { IRestorePasswordState } from "../services/reducers/restore-password";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const restorePasswordState = useSelector((state: IRestorePasswordState) => state.restorePassword);
    useEffect(() => {
        if (!restorePasswordState?.error && !restorePasswordState?.request && restorePasswordState?.message) {
            dispatch(restoreClear());
            navigate("/reset-password", {state: {prevPath: "/forgot-password"} as any});
        }
    }, [restorePasswordState, dispatch, navigate]);

    const restorePasswordHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(restorePassword(email));
    }

    return (
        <main className={`${styles.contentWrapper} ${styles.loginContainer}`}>
            <section className={styles.mainContainer}>
                <h1 className="mb-6 text text_type_main-medium"> Укажите e-mail </h1>
                <form onSubmit={restorePasswordHandler}>
                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="Укажите e-mail"
                            value={email}
                            onChange={ (e) => {setEmail(e.target.value)} }
                        />
                    </div>

                    <div className="mb-20">
                        <Button
                            type="primary"
                            size="medium"
                            htmlType={"submit"}
                        >
                            Восстановить
                        </Button>
                    </div>
                </form>

                    <nav className="mb-4"> 
                        <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span> 
                        <Link
                            to={{ pathname: "/login" }}
                            className={`${mainStyles.linkText} text text_type_main-small`}
                        >
                            Войти
                        </Link>
                    </nav>
            </section>
        </main>
    );
}