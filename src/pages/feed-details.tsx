import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import feedDetailsStyles from "./feed-details.module.css";
import styles from "../components/app/app.module.css";
import { FeedOrderDetails } from "../components/feed/feed-order-details/feed-order-details";
import { wsClose, wsInit } from "../services/actions/order-feed";
import { IOrderFeedDataState } from "../services/reducers/order-feed";


export default function FeedDetailsPage() {
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
            <main className={`${styles.contentWrapper} ${feedDetailsStyles.main}`} >
              <article className={feedDetailsStyles.main}>
                <FeedOrderDetails showTitle/>
              </article>
            </main>
        </>
      );
}
