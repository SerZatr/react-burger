import styles from "./burger-ingredients.module.css";
import subtractImgPath from "../../images/subtract.svg";
import { IIngredient } from "../../utils/ingredient-type";
import { IngredientsInCart } from "../../services/ingredients-in-cart-context";
import { useContext } from "react";
import { DataContext } from "../../services/data-context";

interface IIngredientProps {
    ingredientId: string;
    openIngredientModal: (ingredient: IIngredient) => void;
}

export function Ingredient(props: IIngredientProps) {
    const {ingredientsInCart} = useContext(IngredientsInCart);
    const {data} = useContext(DataContext);
    const ingredient = (data ?? []).filter( i => i._id === props.ingredientId)[0];
    const inCart = ingredient.type === "bun" ? ingredientsInCart?.bunIngredients : ingredientsInCart?.ingredients;

    const count = inCart?.[props.ingredientId] ?? 0;

    return (
        <article
            className={`mb-2 ${styles.card}`}
            onClick={() => props.openIngredientModal(ingredient)}
        >
            {count > 0 &&
                <div className={styles.count}> {count} </div>
            }
            <img className={`mb-1 ${styles.ingredientImg}`} src={ingredient.image} alt="Кристаллы" />
            <div className={`mb-1 mt-1 ${styles.price}`}>
                <p className="mr-2"> {ingredient.price} </p>
                <img src={subtractImgPath} alt="Кристаллы" />
            </div>
            <div className={`${styles.nameContainer} text text_type_main-default`}>
                <p> {ingredient.name} </p>
            </div>
        </article>
    )
}
