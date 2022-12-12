import feedDetailsStyles from "./feed-details.module.css";
import styles from "../components/app/app.module.css";
import { FeedOrderDetails } from "../components/feed/feed-order-details";

export default function FeedDetailsPage() {
  return (
    <>
        <main className={`${styles.contentWrapper} ${feedDetailsStyles.main}`} >
          <article className={feedDetailsStyles.main}>
            <FeedOrderDetails showTitle />
          </article>
        </main>
    </>
  );
}
  