import styles from "./burger-ingredients.module.css";
import subtractImgPath from "../../images/subtract.svg";
import { IIngredient } from "../../utils/ingredient-type";

interface IIngredientProps {
    ingredient: IIngredient;
    openIngredientModal: (ingredient: IIngredient) => void;
    countInCart: number;
}

export function Ingredient(props: IIngredientProps) {
    const ingredient = props.ingredient;
    return (
        <article
            className={`mb-2 ${styles.card}`}
            onClick={() => props.openIngredientModal(ingredient)}
        >
            {props.countInCart > 0 &&
                <div className={styles.count}> {props.countInCart} </div>
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
