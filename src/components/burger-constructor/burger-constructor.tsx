import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { Items, itemType } from "./items";
import subtractImgPath from "../../images/subtract.svg";
import { Item } from "./item";
import { IngredientsInCart } from "../../services/ingredients-in-cart-context";
import { useContext } from "react";

interface IConstructorProps {
    totalPrice: number;
    buyHandler: () => void;
}

export default function BurgerConstructor(props: IConstructorProps) {
    const {ingredientsInCart} = useContext(IngredientsInCart);
    const bunIngredients = ingredientsInCart?.bunIngredients;
    const bunId = bunIngredients ? Object.keys(bunIngredients)[0] : "";
    const bunsCount = bunIngredients?.[bunId];
    const isBottomButton = bunsCount && bunsCount > 1;
    const ingredientsIds: string[] = [];
    Object.keys(ingredientsInCart?.ingredients ?? {}).forEach( i => {
        ingredientsIds.push(i);
    });
    const bunTop = <Item
        ingredientId={bunId}
        type={itemType.top}
    />;
    const bunBottom = <Item
        ingredientId={bunId}
        type={itemType.bottom}
        isLast
    />;

    const isListEmpty = Object.keys(ingredientsInCart?.ingredients ?? []).length === 0;
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
                    <Items ingredientsIds={ingredientsIds} />
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
