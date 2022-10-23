import {  Item } from "./item";
import styles from "./burger-constructor.module.css";
import { useSelector } from "react-redux";
import { ICartState } from "../../services/reducers/cart";

export function Items() {
    const ingredientsInCart = useSelector((state: ICartState) => state.cart.ingredients);

    const getAllItems = () => {
        let itemElements: JSX.Element[] = [];
        const length = ingredientsInCart.length;
        for (let i=0; i<length; i++) {
            const id = ingredientsInCart[i];
            const isLast = i+1 === length;
            itemElements.push(
                <li key={i + id}>
                    <Item
                        ingredientId={id}
                        type={undefined}
                        isLast={isLast}
                        index={i}
                    />
                </li>
            );
        }
        return itemElements;
    };

    return (
        <ul className={styles.unMarkedList}>
            {getAllItems()}
        </ul>
    );
}
