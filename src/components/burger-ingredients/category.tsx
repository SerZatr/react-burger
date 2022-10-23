import { IIngredient } from "../../utils/ingredient-type";
import styles from "./burger-ingredients.module.css";
import { Ingredient } from "./ingredient";

export interface ICategory {
    title: string;
    ingredientsIds: string[];
    categoryName: string;
    openIngredientModal: (ingredient: IIngredient) => void;
}

export function Category(props: ICategory) {
    const getIngredients = () => {
        let ingredients = [];
        for (let i=0; i<props.ingredientsIds.length; i++) {
            const id = props.ingredientsIds[i];
            ingredients.push(
                <Ingredient
                    ingredientId={id}
                    openIngredientModal={props.openIngredientModal}
                    key={id}
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
