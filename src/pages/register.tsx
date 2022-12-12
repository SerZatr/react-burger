import React, { useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import mainStyles from "../components/app/app.module.css"
import { Link } from "react-router-dom";
import { registerUser } from "../services/actions/register";
import { useAppDispatch } from "../services/hooks";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();

    const registerUserHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(email, password, name));
    };

    return (
        <main className={`${styles.contentWrapper} ${styles.loginContainer}`}>
            <section className={styles.mainContainer}>
                <h1 className="mb-6 text text_type_main-medium"> Регистрация </h1>
                <form onSubmit={registerUserHandler}>
                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={ (e) => {setName(e.target.value)} }
                        />
                    </div>

                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={ (e) => {setEmail(e.target.value)} }
                        />
                    </div>

                    <div className="mb-6">
                        <Input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={ (e) => {setPassword(e.target.value)} }
                            icon="ShowIcon"
                        />
                    </div>
                    <div className="mb-20">
                        <Button
                                type="primary"
                                size="medium"
                                htmlType={"submit"}
                            >
                                Зарегистрироваться
                        </Button>
                    </div>
                </form>



                    <nav className="mb-4"> 
                        <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы? </span> 
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