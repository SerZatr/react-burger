import React, { useEffect } from "react";
import OrderFeed from "../components/feed/order-feed";
import styles from "../components/app/app.module.css";
import feedStyles from "./feed.module.css";
import { wsClose, wsInit } from "../services/actions/order-feed";
import { useDispatch, useSelector } from "react-redux";
import OrderFeedInfo from "../components/feed/feed-info/order-feed-info";
import { IOrderFeedDataState } from "../services/reducers/order-feed";

export default function FeedPage() {
    
  const connection = useSelector((state: IOrderFeedDataState) => state.orderFeed);

  const dispatch = useDispatch();
  useEffect(() => {
      if (!connection.wsConnected) {
          dispatch(wsInit(`/orders/all`));
      }
        return (
          () => {
              dispatch(wsClose());
          }
        )
    }, []);

    return (
        <>
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
        </>
      );
}
