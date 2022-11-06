import styles from "./order-details.module.css";
import acceptImgPath from "../../images/accept-order.svg";
import { useSelector } from "react-redux";
import { IOrderState } from "../../services/reducers/order";

export default function OrderDetails() {
    const orderId = useSelector((state: IOrderState) => state.order.id);
    return (
        <section>
            <article className={`${styles.orderDetails} mb-20 mt-4`}>
                <p className={`${styles.order} text text_type_digits-large mb-8`}>
                    {orderId}
                </p>
                <p className="text text_type_main-medium mb-15">
                    идентификатор заказа
                </p>
                <img src={acceptImgPath} className="mb-15" alt="Принять" />
                <p className="text text_type_main-default mb-2">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </article>
        </section>
    );
}
