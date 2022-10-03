import styles from "./burger-ingredients.module.css";
import subtractImgPath from "../../images/subtract.svg";

export interface IIngredientProps {
    name: string;
    price: number;
    image: string;
    countInCart: number;
    addIngredient: () => void;
}

export function Ingredient(props: IIngredientProps) {
    return (
        <section
            className={`mb-2 ${styles.card}`}
            onClick={props.addIngredient}
        >
            {props.countInCart > 0 &&
                <div className={styles.count}> {props.countInCart} </div>
            }
            <img className={`mb-1 ${styles.ingredientImg}`} src={props.image} alt="Кристаллы" />
            <div className={`mb-1 mt-1 ${styles.price}`}>
                <p className="mr-2"> {props.price} </p>
                <img src={subtractImgPath} alt="Кристаллы" />
            </div>
            <div className={styles.nameContainer}>
                <p> {props.name} </p>
            </div>
        </section>
    )
}