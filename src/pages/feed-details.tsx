import { useEffect } from "react";
import feedDetailsStyles from "./feed-details.module.css";
import styles from "../components/app/app.module.css";
import { FeedOrderDetails } from "../components/feed/feed-order-details/feed-order-details";
import { wsClose, wsInit } from "../services/actions/order-feed";
import { useAppSelector, useAppDispatch } from "../services/hooks";


export default function FeedDetailsPage() {
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
        <>
            <main className={`${styles.contentWrapper} ${feedDetailsStyles.main}`} >
              <article className={feedDetailsStyles.main}>
                <FeedOrderDetails showTitle/>
              </article>
            </main>
        </>
      );
}
