import styles from "./burger-ingredients.module.css";
import subtractImgPath from "../../images/subtract.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setIngredientDetails } from "../../services/actions/ingredientDetails";
import { useDrag } from "react-dnd";
import { ICartState } from "../../services/reducers/cart";
import { IIngredientsDataState } from "../../services/reducers/ingredientsData";

interface IIngredientProps {
    ingredientId: string;
}

export const ingredientDragType = "ingredient";

export function Ingredient(props: IIngredientProps) {
    const dispatch = useDispatch();
    const id = props.ingredientId;

    const ingredientsInCart = useSelector((state: ICartState) => state.cart.ingredients);
    const bun = useSelector((state: ICartState) => state.cart.bun);
    const ingredientsData = useSelector((state: IIngredientsDataState) => state.ingredients.data);
    const ingredient = (ingredientsData ?? []).filter( (i) => i._id === id)[0];
    const [, dragRef] = useDrag({
        type: ingredientDragType,
        item: ingredient
    });
    let count = 0;

    const openIngredientModal = () => {
        dispatch(setIngredientDetails(ingredient));
    };

    if (ingredient?.type === "bun") {
        count = bun === id ? 2 : 0;
    } else {
        count = ingredientsInCart.filter( i => i.ingredientId === id ).length;
    }

    return ( ingredient &&
        <article
            className={`mb-2 ${styles.card}`}
            onClick={openIngredientModal}
            ref = {dragRef}
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
