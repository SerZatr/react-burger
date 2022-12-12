import styles from "./order.module.css";
import { Navigation } from "../components/profile/navigation";
import OrderFeed from "../components/feed/order-feed";
import { useEffect } from "react";
import { wsClose, wsInit } from "../services/actions/order-feed";
import { useDispatch, useSelector } from "react-redux";
import { IOrderFeedDataState } from "../services/reducers/order-feed";

export default function OrderPage() {
    const connection = useSelector((state: IOrderFeedDataState) => state.orderFeed);

    const dispatch = useDispatch();
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    useEffect(() => {
        if (!connection.wsConnected) {
            dispatch(wsInit(`/orders?token=${token}`));
        }
          return (
            () => {
                dispatch(wsClose());
            }
          )
      }, []);


    return (
        <main className={`${styles.contentWrapper}`}>
            <section className={`${styles.mainContainer}`}>
                <div className={styles.navigation}>
                    <Navigation active="order" />
                </div>
                <div className={`${styles.feedContainer} customScrollbar`} >
                    <OrderFeed large />
                </div>
            </section>
        </main>
    );
}