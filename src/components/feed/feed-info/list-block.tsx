import { orderStatusCategoryRu } from "../../../utils/constants";
import styles from "./info.module.css";

interface IOrderListProps {
    status: string;
    orders: string[];
}

export default function ListBlock(props: IOrderListProps) {
    
    const getOrders = () => {
        const element: JSX.Element[] = [];
            for (const order of props.orders) {
                element.push(
                    <li className="mb-8" key={order}>
                        {order}
                    </li>
                );
            }
        return element;
    }

    let containerClass = `${styles.orderStatusContainer} text text_type_digits-default`;
    containerClass += props.status === "done" ? " " + styles.doneStatus : ""
    return (
            <article className={`${styles.listBlock}`}>
                <div className="text text_type_main-medium mb-6">
                    {orderStatusCategoryRu[props.status]}
                </div>
                <div className={containerClass}>
                    <ul>
                        {getOrders()}
                    </ul>
                </div>
            </article>
    );
}
