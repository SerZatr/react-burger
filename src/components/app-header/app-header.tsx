import React, { useCallback, useEffect } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css"
import { useState } from "react";
import NavItem from "./nav-item"
import { NavLink } from "react-router-dom";

enum links {
    constructor = 1,
    list,
    profile
}

export default function AppHeader () {
    const pathname = window.location.pathname;

    const getActiveLink = useCallback(() => {
        if (pathname === "/") {
            return links.constructor;
        } else if (pathname === "/login" || pathname === "/forgot-password" || pathname === "/reset-password" || pathname === "/register" || pathname === "/profile") {
            return links.profile;
        } else if (pathname === "/order" || pathname.match(/feed|orders/)) {
            return links.list;
            
        } else {
            return 0;
        }
    }, [pathname])
    const [activeLink, setActiveLink] = useState(getActiveLink());
    const activeClassName = styles.activeLink;
    const inactiveClassName = `text_color_inactive ${styles.inactiveLink}`;

    useEffect(() => {
        setActiveLink(getActiveLink());
    }, [getActiveLink]);

    const isConstrorActive = activeLink === links.constructor;
    const isListActive = activeLink === links.list;
    const isProfileActive = activeLink === links.profile;

    return (
        <header className={`${styles.panel}`}>
            <div className={styles.content}>
                <nav className={styles.navigation + " pt-4 pb-4"}>
                    <NavLink
                        to="/"
                        className={isConstrorActive ? activeClassName : inactiveClassName
                      }
                    >
                        <NavItem
                            icon={<BurgerIcon type={isConstrorActive ? "primary" : "secondary"} />}
                            text="Конструктор"
                            isActive={isConstrorActive}
                        />
                    </NavLink>
                    <NavLink
                        to="/feed"
                        className={isListActive ? activeClassName : inactiveClassName
                      }
                    >
                        <NavItem
                            icon={<ListIcon type={isListActive ? "primary" : "secondary"} />}
                            text="Лента заказов"
                            isActive={isListActive}
                        />
                    </NavLink>
                </nav>

                <div className={styles.logoWrapper}>
                    <Logo />
                </div>

                <nav className={styles.navigation + " pt-4 pb-4"}>
                    <NavLink
                        to="profile"
                        className={isProfileActive ? activeClassName : inactiveClassName
                      }
                    >
                        <NavItem
                            icon={<ProfileIcon type={isProfileActive ? "primary" : "secondary"} />}
                            text="Личный кабинет"
                            isActive={isProfileActive}
                        />
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
