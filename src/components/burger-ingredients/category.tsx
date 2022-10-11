import { IIngredientsInCart } from "../app/app";
import { IIngredient } from "../../utils/ingredient-type";
import styles from "./burger-ingredients.module.css";
import { Ingredient } from "./ingredient";

export interface ICategory {
    title: string;
    ingredients: IIngredient[];
    ingredientsInCart: IIngredientsInCart;
    categorieName: string;
    openIngredientModal: (ingredient: IIngredient) => void;
}

export function Category(props: ICategory) {
    const getIngredients = () => {
        let ingredients = [];
        for (let i=0; i<props.ingredients.length; i++) {
            const ingredient = props.ingredients[i];
            const id = ingredient._id;
            let count = 0;
            if (ingredient.type !== "bun") {
                count = props.ingredientsInCart.ingredients?.[id]?.count ?? 0;
            } else {
                count = props.ingredientsInCart.bunIngredients?.[id]?.count ?? 0;
            }
            ingredients.push(
                <Ingredient
                    ingredient={ingredient}
                    countInCart={count}
                    openIngredientModal={props.openIngredientModal}
                    key={ingredient._id}
                />
            );
        }
        return ingredients;
    };

    return (
        <article>
            <p className = {`text text_type_main-medium mb-6`}>
                {props.title}
            </p>
            <div className={`pl-4 mb-2 ${styles.categoryItems}`}>
                { getIngredients() }
            </div>
        </article>
    );
}
