import { Item } from "./item";
import styles from "./burger-constructor.module.css";
import { ICartState } from "../../services/reducers/cart";
import { useAppSelector } from "../../utils/hooks";

export function Items() {
    const ingredientsInCart = useAppSelector((state) => state.cart.ingredients);

    const getAllItems = () => {
        let itemElements: JSX.Element[] = [];
        const length = ingredientsInCart.length;
        for (let i=0; i<length; i++) {
            const id = ingredientsInCart[i].ingredientId;
            const uuid = ingredientsInCart[i].uuid;
            const isLast = i+1 === length;
            itemElements.push(
                <li key={uuid}>
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
