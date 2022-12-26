import React, { useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import mainStyles from "../components/app/app.module.css"
import { Link } from "react-router-dom";
import { login } from "../services/actions/login";
import { useAppDispatch } from "../utils/hooks";

export default function LoginPage() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const dispatch = useAppDispatch();

const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password));
}

    return (
        <main className={`${styles.contentWrapper} ${styles.loginContainer}`}>
            <section className={styles.mainContainer}>
                <h1 className="mb-6 text text_type_main-medium"> Вход </h1>
                    <form onSubmit={loginHandler}>
                        <div className="mb-6">
                            <Input
                                type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={ (e) => {setEmail(e.target.value)} }
                                data-cy="emailInput"
                            />
                        </div>

                        <div className="mb-6">
                            <Input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={ (e) => {setPassword(e.target.value)} }
                                icon="ShowIcon"
                                data-cy="passwordInput"
                            />
                        </div>
                        <div className="mb-20">
                            <Button
                                    type="primary"
                                    size="medium"
                                    htmlType={"submit"}
                                    data-cy="enterButton"
                                >
                                    Войти
                            </Button>
                        </div>
                    </form>

                    <nav className="mb-4"> 
                        <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь? </span> 
                        <Link
                            to={{ pathname: "/register" }}
                            className={`${mainStyles.linkText} text text_type_main-small`}
                        >
                            Заргеистрироваться
                        </Link>
                    </nav>
                    <nav> 
                        <span className="text text_type_main-default text_color_inactive">Забыли пароль? </span> 
                        <Link to="/forgot-password" className={`${mainStyles.linkText} text text_type_main-small`}>
                            Восстановить пароль
                        </Link >
                    </nav>

            </section>
        </main>
    );
}