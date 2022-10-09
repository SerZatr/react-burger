import { IIngredientsCountedById } from "../app/app";
import { IIngredient } from "../../utils/ingredient-type";
import { Item } from "./item";
import styles from "./burger-constructor.module.css"

interface IItemsProps {
    ingredients: IIngredientsCountedById;
    openIngredientModal: (ingredient: IIngredient) => void;
    removeIngredient?: (ingredient: IIngredient) => void;
}

 export enum itemType {
    top = "top",
    bottom = "bottom"
};

export function Items(props: IItemsProps) {
    const getItemsByType = (
        ingredient: IIngredient,
        count: number,
        openIngredientModal: (ingredient: IIngredient) => void,
        type?: itemType,
        isLast?: boolean
    ) => {
        let itemElements: JSX.Element[] = [];
        for (let i=0; i<count; i++) {
            itemElements.push(
                <li key={i + ingredient._id}>
                    <Item
                        ingredient={ingredient}
                        type={type}
                        removeIngredient={props.removeIngredient}
                        isLast={isLast && i+1 === count}
                        openIngredientModal={openIngredientModal}
                    />
                </li>
            );
        }
        return itemElements;
    }

    const getAllItems = () => {
        let itemElements: JSX.Element[] = [];
        const ingredients = props.ingredients;
        for (let i=0; i<Object.keys(ingredients).length; i++) {
            const key = Object.keys(ingredients)[i];
            const ingredient = ingredients[key].ingredient;
            const count = ingredients[key].count;
            const isLast = i+1 === Object.keys(ingredients).length;
            const categorieItems = getItemsByType(ingredient, count, props.openIngredientModal, undefined, isLast);
            itemElements = itemElements.concat(categorieItems);
        }
        return itemElements;
    }

    return (
        <ul className={styles.unMarkedList}>
            {getAllItems()}
        </ul>
    )
}