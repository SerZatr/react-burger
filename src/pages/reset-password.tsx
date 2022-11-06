import React, { useEffect, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import mainStyles from "../components/app/app.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restoreClear } from "../services/actions/restore-password";
import { IRestorePasswordState } from "../services/reducers/restore-password";
import { resetPassword } from "../services/actions/reset-password";

export default function LoginPage() {

    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const restorePasswordState = useSelector((state: IRestorePasswordState) => state.restorePassword);
    useEffect(() => {
        if (!restorePasswordState?.error && !restorePasswordState?.request && restorePasswordState?.message) {
            dispatch(restoreClear());
            navigate("/reset-password");
        }
    }, [restorePasswordState]);

    return (
        <main className={`${styles.contentWrapper} ${styles.loginContainer}`}>
            <section className={styles.mainContainer}>
                <h1 className="mb-6 text text_type_main-medium"> Восстановление пароля </h1>

                <div className="mb-6">
                    <Input
                        type="password"
                        placeholder="Введите новый пароль"
                        value={password}
                        onChange={ (e) => {setPassword(e.target.value)} }
                        icon={"ShowIcon"}
                    />
                </div>

                <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Введите код из письма"
                        value={code}
                        onChange={ (e) => {setCode(e.target.value)} }
                    />
                </div>

                <div className="mb-20">
                    <Button
                        type="primary"
                        size="medium"
                        onClick={() => dispatch(resetPassword(password, code)) }
                        htmlType={"button"}
                    >
                        Сохранить
                    </Button>
                </div>

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