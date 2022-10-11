import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext } from "react";
import { DataContext } from "../../services/data-context";
import { IngredientsInCart } from "../../services/ingredients-in-cart-context";
import styles from "./burger-constructor.module.css"
import { itemType } from "./items";

interface IItemProps {
    ingredientId: string,
    type?: itemType,
    isLast?: boolean
}

export function Item(props: IItemProps) {
    const {data} = useContext(DataContext);
    const {ingredientsInCart, setIngredientsInCart} = useContext(IngredientsInCart);
    const ingredient = data?.filter( i => i._id === props.ingredientId)[0];
    let text = ingredient?.name ?? "";
    const ruType = {top: "верх", bottom: "низ"};
    let className = `ml-4 mr-4 ${styles.constructorCard}`;
    className = props.isLast ? className : className + " mb-4";
    text = props.type ? `${text} (${ruType[props.type]})` : text;

    const removeIngredient = (id: string) => {
        const newIngredients = structuredClone(ingredientsInCart);
        let ingredientCount = newIngredients.ingredients[id];
        newIngredients.ingredients[id] -= 1;
        if (ingredientCount === 0) {
          delete newIngredients.ingredients[id];
        }
        setIngredientsInCart?.(newIngredients);
      };

    if (ingredient) {
        return (
            <article className={className}>
                <div className={styles.ingredientBox}>
                    <ConstructorElement
                        type={props.type}
                        isLocked={!!props.type}
                        text={text}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={ () => {
                            removeIngredient(props.ingredientId);
                        }}
                        
                    />
                </div>
                {!props.type
                    && <DragIcon type={"primary"} />
                }
            </article>
        );
    } else {
        return (<></>);
    }
}
