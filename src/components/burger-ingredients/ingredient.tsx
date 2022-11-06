import styles from "./burger-ingredients.module.css";
import subtractImgPath from "../../images/subtract.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setIngredientDetails } from "../../services/actions/ingredient-details";
import { useDrag } from "react-dnd";
import { ICartState } from "../../services/reducers/cart";
import { IIngredientsDataState } from "../../services/reducers/ingredients-data";
import { Link, useLocation } from "react-router-dom";

interface IIngredientProps {
    ingredientId: string;
}

export const ingredientDragType = "ingredient";

export function Ingredient(props: IIngredientProps) {
    const dispatch = useDispatch();
    const location = useLocation();
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

    return (
        <Link
            key={id}
            to={{
                pathname: `/ingredients/${id}`,
                state: {background: location} 
            } as any}
            state={{background: location}}
            className={`${styles.card} text text_type_main-default`}
            
        >
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
                <div className={`${styles.nameContainer}`}>
                    <p> {ingredient.name} </p>
                </div>
            </article>
        </Link>
    )
}
