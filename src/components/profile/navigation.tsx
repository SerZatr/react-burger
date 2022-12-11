
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/actions/logout";
import styles from "./profile.module.css";

interface INavigationProps {
    active: "profile" | "order";
}

export function Navigation(props: INavigationProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    };

    const defaultClass = `${styles.mainNavItem} text text_type_main-medium`;
    const activeClass = defaultClass + " " + styles.active;
    const inActiveClass = defaultClass + " text_color_inactive";
    const profileClass = props.active === "profile"
        ? activeClass
        : inActiveClass;
    const orderClass = props.active === "order"
        ? activeClass
        : inActiveClass;

    return (
        <nav className={styles.mainNavigation} >
        <NavLink to="/profile" className={profileClass}> Профиль </NavLink>
        <NavLink to="/profile/orders" className={orderClass}> История заказов </NavLink>
        <div onClick={logoutHandler} className={inActiveClass}> Выход </div>
    </nav>
    );
}
