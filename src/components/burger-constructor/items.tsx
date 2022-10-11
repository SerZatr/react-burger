import { Item } from "./item";
import styles from "./burger-constructor.module.css"
import { IngredientsInCart } from "../../services/ingredients-in-cart-context";
import { useContext } from "react";

interface IItemsProps {
    ingredientsIds: string[];
};

 export enum itemType {
    top = "top",
    bottom = "bottom"
};

export function Items(props: IItemsProps) {
    const {ingredientsInCart} = useContext(IngredientsInCart);
    const getItemsByType = (
        id: string,
        count: number,
        type?: itemType,
        isLast?: boolean
    ) => {
        let itemElements: JSX.Element[] = [];
        for (let i=0; i<count; i++) {
            itemElements.push(
                <li key={i + id}>
                    <Item
                        ingredientId={id}
                        type={type}
                        isLast={isLast && i+1 === count}
                    />
                </li>
            );
        }
        return itemElements;
    };

    const getAllItems = () => {
        let itemElements: JSX.Element[] = [];
        const ingredientsIds = props.ingredientsIds;
        for (let i=0; i<Object.keys(ingredientsIds).length; i++) {
            const id = ingredientsIds[i];
            const count = ingredientsInCart?.ingredients?.[id] ?? 0;
            const isLast = i+1 === Object.keys(ingredientsIds).length;
            const categorieItems = getItemsByType(id, count, undefined, isLast);
            itemElements = itemElements.concat(categorieItems);
        }
        return itemElements;
    };

    return (
        <ul className={styles.unMarkedList}>
            {getAllItems()}
        </ul>
    );
}
