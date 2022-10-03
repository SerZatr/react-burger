import { IIngredientsCountedById } from "../app/app";
import { IIngredient } from "../../utils/ingredient-type";
import { Item } from "./item";

interface IItemsProps {
    ingredients: IIngredientsCountedById;
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
        type?: itemType,
        isLast?: boolean
    ) => {
        let itemElements: JSX.Element[] = [];
        for (let i=0; i<count; i++) {
            itemElements.push(
                <Item
                    ingredient={ingredient}
                    type={type}
                    removeIngredient={props.removeIngredient}
                    key={i + ingredient._id + type}
                    isLast={isLast && i+1 === count}
                />
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
            const categorieItems = getItemsByType(ingredient, count, undefined, isLast);
            itemElements = itemElements.concat(categorieItems);
        }
        return itemElements;
    }

    return (
        <>
            {getAllItems()}
        </>
    )
}