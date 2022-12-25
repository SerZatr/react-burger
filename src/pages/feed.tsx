import React, { useEffect } from "react";
import OrderFeed from "../components/feed/order-feed";
import styles from "../components/app/app.module.css";
import feedStyles from "./feed.module.css";
import { wsClose, wsInit } from "../services/actions/order-feed";
import OrderFeedInfo from "../components/feed/feed-info/order-feed-info";
import { useAppSelector, useAppDispatch } from "../utils/hooks";

export default function FeedPage() {
    
  const connection = useAppSelector((state) => state.orderFeed);
  const dispatch = useAppDispatch();

  useEffect(() => {
      if (!connection.wsConnected) {
          dispatch(wsInit(`/orders/all`));
      }
    }, [connection.wsConnected]);
    useEffect(() => {
      return (
        () => {
            dispatch(wsClose());
        }
      )
    }, []);

    return (
      <main className={styles.contentWrapper}>
        <section className={`${styles.mainContainer} ${feedStyles.mainContainer} `}>
          <div className={feedStyles.feedContainer} >
          <section className={`${feedStyles.orderFeed} mt-10`}>
              <h1 className="text text_type_main-large mb-5">
                  Лента заказов
              </h1>
              <article className={`${feedStyles.contentWrapper} customScrollbar pr-2`} >
                <OrderFeed />
              </article>
          </section>
          </div>
          <OrderFeedInfo />
        </section>
      </main>
    );
}
