import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../utils/ingredient-type";
import styles from "./burger-constructor.module.css"
import { itemType } from "./items";
import dragAndDrop from "../../images/drag-and-drop.svg"

interface IItemProps {
    ingredient: IIngredient,
    type?: itemType,
    removeIngredient: (ingredient: IIngredient) => void
}

export function Item(props: IItemProps) {
    let text = props.ingredient.name;
    const ruType = {top: "верх", bottom: "низ"};
    text = props.type ? `${text} (${ruType[props.type]})` : text;
    return (
        <section className={`ml-4 mr-4 mb-4 ${styles.constructorCard}`}>
            <div className={styles.ingredientBox}>
                <ConstructorElement
                    type={props.type}
                    isLocked={!!props.type}
                    text={text}
                    price={props.ingredient.price}
                    thumbnail={props.ingredient.image}
                    handleClose={ () => props.removeIngredient(props.ingredient) }
                />
            </div>
            {!props.type
                && <img src={dragAndDrop} className={styles.dragAndDropIcon} alt="Перемещение ингредиента"
            />}
        </section>
    )
}

