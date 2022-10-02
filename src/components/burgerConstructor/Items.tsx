import { IIngredientsInCart } from "../../App";
import { IIngredient } from "../../utils/ingredientType";
import { Item } from "./Item";

interface IItemsProps {
    ingredientsInCart: IIngredientsInCart;
    removeIngredient: (ingredient: IIngredient) => void;
}

 export enum itemType {
    top = "top",
    bottom = "bottom"
};

export function Items(props: IItemsProps) {
    const getItemsOfCategorie = (
        ingredient: IIngredient,
        count: number,
        type?: itemType
    ) => {
        let itemElements: JSX.Element[] = [];
        for (let i=0; i<count; i++) {
            itemElements.push(
                <Item
                    ingredient={ingredient}
                    type={type}
                    removeIngredient={props.removeIngredient}
                    key={i + ingredient._id + type}
                />
            );
        }
        return itemElements;
    }

    const getAllItems = () => {
        let itemElements: JSX.Element[] = [];
        const buns = props.ingredientsInCart.bunIngredients;
        if (buns[0]) {
            itemElements = getItemsOfCategorie(buns[0], 1, itemType.top);
        }

        const categories = props.ingredientsInCart.ingredients;
        Object.keys(categories).forEach( key => {
            const ingredient = categories[key].ingredient;
            const count = categories[key].count;
            const categorieItems = getItemsOfCategorie(ingredient, count);
            itemElements = itemElements.concat(categorieItems);
        })

        if (buns[1]) {
            const bottomBun = getItemsOfCategorie(buns[1], 1, itemType.bottom);
            itemElements = itemElements.concat(bottomBun);
        }
        return itemElements;

    }

    return (
        <>
            {getAllItems()}
        </>
    )
}