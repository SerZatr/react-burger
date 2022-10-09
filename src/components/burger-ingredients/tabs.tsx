import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css"

interface ITabsProps {
    tabNames: string[];
    activeTab: string;
    callback: (tabName: string) => void;
}

export function Tabs(props: ITabsProps) {
    const getTabs = () => {
        let tabElements: JSX.Element[] = [];
        props.tabNames.forEach( tabName => {
            tabElements.push(
                <Tab 
                    active={tabName === props.activeTab}
                    value={tabName}
                    onClick={() => props.callback(tabName)}
                    key={"tab" + tabName}
                >
                    {tabName}
                </Tab>
            );
        });
        return tabElements;
    }
    return (
        <nav className={`mb-10 ${styles.tabs} text text_type_main-default`}>
            {getTabs()}
        </nav>
    );
}