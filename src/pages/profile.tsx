import React, { useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import mainStyles from "../components/app/app.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IProfileState } from "../services/reducers/profile";
import { updateProfile } from "../services/actions/profile-update";
import { NavLink } from "react-router-dom";
import { logout } from "../services/actions/logout";

export default function LoginPage() {

    const defaultName = useSelector((state: IProfileState) => state.profile.user?.name) ?? "";
    const defaultLogin = useSelector((state: IProfileState) => state.profile.user?.email) ?? "";
    const [name, setName] = useState(defaultName);
    const [login, setLogin] = useState(defaultLogin);
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dismissChanges = () => {
        setName(defaultName);
        setLogin(defaultLogin);
    }
    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <main className={`${styles.contentWrapper} ${styles.profileContentWrapper}`}>
            <section className={`${styles.mainContainer} ${styles.profileMainContainer}`}>
                <nav className={styles.mainNavigation} >
                    <NavLink to="/profile" className={`${styles.mainNavItem} text text_type_main-medium ${styles.active}`}> Профиль </NavLink>
                    <NavLink to="/order" className={`${styles.mainNavItem} text text_type_main-medium text_color_inactive`}> История заказов </NavLink>
                    <div onClick={logoutHandler} className={`${styles.mainNavItem} text text_type_main-medium text_color_inactive`}> Выход </div>
                </nav>
                <div>
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
                            placeholder="Логин"
                            value={login}
                            onChange={ (e) => {setLogin(e.target.value)} }
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
                    <div className={styles.buttonsSection}>
                        <div className="mb-6">
                            <Button
                                    type="primary"
                                    size="medium"
                                    onClick={() => dispatch(updateProfile(login, name, password)) }
                                    htmlType={"button"}
                                >
                                    Сохранить
                            </Button>
                        </div>
                        <div className="mb-20">
                            <Button
                                    type="primary"
                                    size="medium"
                                    onClick={dismissChanges}
                                    htmlType={"button"}
                                >
                                    Отменить
                            </Button>
                        </div>
                    </div>
                </div>


            </section>
        </main>
    );
}