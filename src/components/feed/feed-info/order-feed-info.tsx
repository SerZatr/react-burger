import { useAppSelector } from "../../../utils/hooks";
import styles from "./info.module.css";
import ListBlock from "./list-block";

export interface ordersByStatus {
    [status: string]: string[];
};

export default function OrderFeedInfo() {
    const orderFeed = useAppSelector((state) => state.orderFeed.data);
    const getLists = () => {
        const element: JSX.Element[] = [];
        const ordersByStatus: ordersByStatus  = {};
        if (!orderFeed.orders) {
            return element;
        }
        for (const order of orderFeed.orders) {
            if (!ordersByStatus[order.status]) {
                ordersByStatus[order.status] = [];
            }
            ordersByStatus[order.status].push(String(order.number));
        }
        
        let currentListOrders: string[] = [];
        
        Object.keys(ordersByStatus).forEach((status, index) => {
            const _orders = ordersByStatus[status];
            _orders.forEach( (id, _index) => {
                currentListOrders.push(id);
                const ordersLength = Object.keys(ordersByStatus).length;
                if (!(_index%10) || index === ordersLength) {
                    element.push(<ListBlock orders={currentListOrders} status={status} key={"list" + id} />)
                    currentListOrders = [];
                }
            })
        });
        return element;
    }

    return (
            <section className={`${styles.orderFeedInfo} customScrollbar`}>
                <article className={`${styles.listsWrapper} mb-15`} >
                    { getLists() }
                </article>
                <article className={`${styles.totalWrapper} mb-15`}>
                    <span className="text text_type_main-medium">
                        Выполнено за все время:
                    </span>
                    <span className={`${styles.totalNum} text text_type_digits-large`}>
                        {orderFeed.total}
                    </span>
                </article>
                <article className={`${styles.totalWrapper} mb-15`}>
                    <span className="text text_type_main-medium">
                        Выполнено за сегодня:
                    </span>
                    <span className={`${styles.totalNum} text text_type_digits-large`}>
                        {orderFeed.totalToday}
                    </span>
                </article>
            </section>
    );
}
