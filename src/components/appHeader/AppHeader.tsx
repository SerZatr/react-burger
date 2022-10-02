import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css"
import { useState } from "react";
import NavItem from "./NavItem"

enum links {
    constructor,
    list,
    profile
}

export default function AppHeader () {
    const [activeLink] = useState(links.constructor);
    const isConstrorActive = activeLink === links.constructor;
    const isListActive = activeLink === links.list;
    const isProfileActive = activeLink === links.profile;
    return (
        <header className={`${styles.panel}`}>
            <div className={styles.content}>
                <nav className={styles.navigation + " pt-4 pb-4"}>
                    <NavItem
                        icon={<BurgerIcon type={isConstrorActive ? "primary" : "secondary"} />}
                        text="Конструктор"
                        isActive={isConstrorActive}
                    />
                    <NavItem
                        icon={<ListIcon type={isListActive ? "primary" : "secondary"} />}
                        text="Лента заказов"
                        isActive={isListActive}
                    />
                </nav>

                <div className={styles.logoWrapper}>
                    <Logo />
                </div>

                <nav className={styles.navigation + " pt-4 pb-4"}>
                    <NavItem
                        icon={<ProfileIcon type={isProfileActive ? "primary" : "secondary"} />}
                        text="Личный кабинет"
                        isActive={isProfileActive}
                    />
                </nav>
            </div>
        </header>
    )
}