import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../utils/ingredient-type";
import styles from "./burger-constructor.module.css"
import { itemType } from "./items";

interface IItemProps {
    ingredient: IIngredient,
    openIngredientModal: (ingredient: IIngredient) => void,
    type?: itemType,
    removeIngredient?: (ingredient: IIngredient) => void,
    isLast?: boolean
}

export function Item(props: IItemProps) {

    let text = props.ingredient.name;
    const ruType = {top: "верх", bottom: "низ"};
    let className = `ml-4 mr-4 ${styles.constructorCard}`;
    className = props.isLast ? className : className + " mb-4";
    text = props.type ? `${text} (${ruType[props.type]})` : text;
    return (
        <article className={className}>
            <div
                className={styles.ingredientBox}
                onClick={(event) => {
                    if ((event.target as HTMLElement).classList.contains("constructor-element__image")) {
                        props.openIngredientModal(props.ingredient)
                        console.log(props.ingredient);
                    }
                }}
            >
                <ConstructorElement
                    type={props.type}
                    isLocked={!!props.type}
                    text={text}
                    price={props.ingredient.price}
                    thumbnail={props.ingredient.image}
                    handleClose={ () => {
                        props.removeIngredient?.(props.ingredient);
                    }}
                />
            </div>
            {!props.type
                && <DragIcon type={"primary"} />
            }
        </article>
    )
}

