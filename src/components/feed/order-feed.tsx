import { useAppSelector } from "../../utils/hooks";
import Card from "./card";

interface IOrderFeedProps {
    large?: boolean;
}

export default function OrderFeed(props: IOrderFeedProps) {
    const orderFeed = useAppSelector((state) => state.orderFeed.data);
    const getContent = () => {
        const element: JSX.Element[] = [];
        if (orderFeed.orders) {
            for (const orderFeedData of Object.values(orderFeed.orders)) {
                const card = <Card orderFeedData={orderFeedData} key={"card" + orderFeedData.number} large={props.large} />;
                if (props.large) {
                    element.unshift(
                        card
                    );
                } else {
                    element.push(
                        card
                    );
                }
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
