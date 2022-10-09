import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { Items, itemType } from "./items";
import { IIngredient } from "../../utils/ingredient-type";
import { IIngredientsInCart } from "../app/app";
import subtractImgPath from "../../images/subtract.svg";
import { Item } from "./item";

interface IConstructorProps {
    ingredientsInCart: IIngredientsInCart;
    removeIngredient: (ingredient: IIngredient) => void;
    totalPrice: number;
    openIngredientModal: (ingredient: IIngredient) => void;
    buyHandler: () => void;
}

export default function BurgerConstructor(props: IConstructorProps) {
    const bunIngredients = props.ingredientsInCart.bunIngredients;
    const bunId = Object.keys(bunIngredients)[0];
    const bunsCount = bunIngredients?.[bunId]?.count;
    const bun = bunIngredients?.[bunId]?.ingredient;
    const isBottomButton = bunsCount && bunsCount > 1;
    const bunTop = <Item
        ingredient={bun}
        type={itemType.top}
        openIngredientModal={() => props.openIngredientModal(bun)}
    />
    const bunBottom = <Item
        ingredient={bun}
        type={itemType.bottom}
        openIngredientModal={() => props.openIngredientModal(bun)}
        isLast
    />

    const isListEmpty = Object.keys(props.ingredientsInCart.ingredients).length === 0;
    let ingredientsContainerClass = "customScrollbar";
    ingredientsContainerClass += isListEmpty
        ? ` ${styles.ingredientsContainerEmpty}`
        : ` ${styles.ingredientsContainer}`;
        
    if (isBottomButton && !isListEmpty) {
        ingredientsContainerClass += " mb-4";
    }

    return (
        <section className={`mt-25 ${styles.constructorSection} section`}>
            <article className={`mb-10 ${styles.ingredientsAndBunsContainer}` }>
                <div className={styles.bun}>
                    {bunsCount && bunTop}
                </div>
                <div className={ingredientsContainerClass}>
                    <Items
                        ingredients={props.ingredientsInCart.ingredients}
                        removeIngredient={props.removeIngredient}
                        openIngredientModal={(ingredient: IIngredient) => props.openIngredientModal(ingredient)}
                    />
                </div>
                <div className={styles.bun}>
                    {isBottomButton && bunBottom}
                </div>
            </article>
            <article className={`pr-4 pl-4 ${styles.buyContainer}`}>
                <div className={`mr-10 ${styles.priceContainer} `}>
                        <p className="text text_type_digits-medium">
                            {props.totalPrice}
                        </p>
                        <img src={subtractImgPath} className={styles.priceIcon} alt="Кристаллы" />
                </div> 
                    <Button type="primary" size="large" htmlType={"button"} onClick={props.buyHandler}>
                        Оформить заказ
                    </Button>
            </article>
        </section>
    );
}