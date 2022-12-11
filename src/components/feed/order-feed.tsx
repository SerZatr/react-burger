import { useSelector } from "react-redux";
import { IOrderFeedDataState } from "../../services/reducers/order-feed";
import styles from "./feed.module.css";
import Card from "./card";

interface IOrderFeedProps {
    large?: boolean;
}

export default function OrderFeed(props: IOrderFeedProps) {
    const orderFeed = useSelector((state: IOrderFeedDataState) => state.orderFeed.data);
    const getContent = () => {
        const element: JSX.Element[] = [];
        if (orderFeed.orders) {
            for (const orderFeedData of Object.values(orderFeed.orders)) {
                element.push(
                    <Card orderFeedData={orderFeedData} key={"card" + orderFeedData.number} large={props.large} />
                );
            }
        }

        return element;
    }

    return (
        <article className={`customScrollbar pr-2`} >
            { getContent() }
        </article>
    );
}
