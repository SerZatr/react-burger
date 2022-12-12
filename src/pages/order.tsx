import styles from "./order.module.css";
import { Navigation } from "../components/profile/navigation";
import OrderFeed from "../components/feed/order-feed";
import { useEffect } from "react";
import { wsClose, wsInit } from "../services/actions/order-feed";
import { BASE_WS } from "../utils/constants";
import { useAppSelector, useAppDispatch } from "../services/hooks";

export default function OrderPage() {
    const connection = useAppSelector((state) => state.orderFeed);

    const dispatch = useAppDispatch();
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