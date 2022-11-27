import styles from "./app-header.module.css";

interface INavItemProps {
    icon: JSX.Element;
    text: string;
    isActive: boolean;
}

export default function NavItem(props: INavItemProps) {
    let pClass = "text text_type_main-default m-1";
    pClass = props.isActive ? pClass : `${pClass} text_color_inactive`;
    return (
        <div className={styles.item + " mr-1 pr-5 pl-5 pt-4 pb-4"}>
            <div className="m-1">
                {props.icon}
            </div>
            <p className={pClass}>
                {props.text}
            </p>
        </div>
    );
}
