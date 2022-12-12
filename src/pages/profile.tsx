import React, { useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { updateProfile } from "../services/actions/profile-update";
import { Navigation } from "../components/profile/navigation";
import { useAppSelector, useAppDispatch } from "../services/hooks";

export default function LoginPage() {

    const defaultName = useAppSelector((state) => state.profile.user?.name) ?? "";
    const defaultLogin = useAppSelector((state) => state.profile.user?.email) ?? "";
    const [name, setName] = useState(defaultName);
    const [login, setLogin] = useState(defaultLogin);
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const dismissChanges = () => {
        setName(defaultName);
        setLogin(defaultLogin);
    };


    const updateProfileHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfile(login, name, password));
    };

    return (
        <main className={`${styles.contentWrapper} ${styles.profileContentWrapper}`}>
            <section className={`${styles.mainContainer} ${styles.profileMainContainer}`}>
                <Navigation active="profile" />

                <form onSubmit={updateProfileHandler}>
                    <div>
                        <div className="mb-6">
                            <Input
                                type="text"
                                placeholder="Имя"
                                value={name}
                                onChange={ (e) => {setName(e.target.value)} }
                                icon="EditIcon"
                            />
                        </div>

                        <div className="mb-6">
                            <Input
                                type="text"
                                placeholder="Логин"
                                value={login}
                                onChange={ (e) => {setLogin(e.target.value)} }
                                icon="EditIcon"
                            />
                        </div>

                        <div className="mb-6">
                            <Input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={ (e) => {setPassword(e.target.value)} }
                                icon="EditIcon"
                            />
                        </div>
                        { (name !== defaultName || login !== defaultLogin || password) && 
                            <div className={styles.buttonsSection}>
                                <div className="mb-6">
                                    <Button
                                            type="primary"
                                            size="medium"
                                            htmlType={"submit"}
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
                        }
                    </div>
                </form>



            </section>
        </main>
    );
}