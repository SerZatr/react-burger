import styles from "./app-header.module.css"
import mainStyles from "../app/app.module.css"

interface navItemProps {
    icon: JSX.Element;
    text: string;
    isActive: boolean;
}

export default function NavItem(props: navItemProps) {
    let pClass = "text text_type_main-default m-1";
    pClass = props.isActive ? pClass : `${pClass} ${mainStyles.secondaryTxt}`;
    return (
        <li className={styles.item + " mr-1 pr-5 pl-5 pt-4 pb-4"}>
            <div className="m-1">
                {props.icon}
            </div>
            <p className={pClass}>
                {props.text}
            </p>
        </li>
    )
}
