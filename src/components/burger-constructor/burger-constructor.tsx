import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { Items } from "./items";
import subtractImgPath from "../../images/subtract.svg";
import { Item, itemType } from "./item";
import { useDrop } from "react-dnd";
import { ingredientDragType } from "../burger-ingredients/ingredient";
import { addBun, addIngredient, replaceBun } from "../../services/actions/cart";
import { IIngredient } from "../../utils/constants";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";

interface IConstructorProps {
    totalPrice: number;
    buyHandler: () => void;
}

export default function BurgerConstructor(props: IConstructorProps) {

    const ingredientsInCart = useAppSelector((state) => state.cart.ingredients);
    const bunId = useAppSelector((state) => state.cart.bun) ?? "";
    const dispatch = useAppDispatch();
    const ingredientsIds: string[] = [];
    ingredientsInCart.forEach( i => {
        ingredientsIds.push(i.ingredientId);
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

    const [{isHover}, dropTarget] = useDrop({
        accept: ingredientDragType,
        drop(ingredient: IIngredient) {
            if (ingredient.type === "bun" && !bunId) {
                dispatch(addBun(ingredient._id));
            } else if (ingredient.type === "bun" && bunId) {
                dispatch(replaceBun(ingredient._id));
            } else {
                dispatch(addIngredient(ingredient._id));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const isListEmpty = ingredientsInCart.length === 0;
    let ingredientsContainerClass = "customScrollbar";
    ingredientsContainerClass += isListEmpty
        ? ` ${styles.ingredientsContainerEmpty}`
        : ` ${styles.ingredientsContainer}`;
        
    if (bunId && !isListEmpty) {
        ingredientsContainerClass += " mb-4";
    }

    let className = `mb-10 ${styles.ingredientsAndBunsContainer}`;
    className = isHover ? styles.constructorHover + " " + className : className;

    return (
        <section className={`mt-25 ${styles.constructorSection} section`}>
            <article className={className} ref={dropTarget} data-cy="ingredientsDropArea">
                <div className={styles.bun}>
                    {bunId && bunTop}
                </div>
                <div className={ingredientsContainerClass}>
                    <Items />
                </div>
                <div className={styles.bun}>
                    {bunId && bunBottom}
                </div>
            </article>
            <article className={`pr-4 pl-4 ${styles.buyContainer}`}>
                <div className={`mr-10 ${styles.priceContainer} `}>
                        <p className="text text_type_digits-medium">
                            {props.totalPrice}
                        </p>
                        <img src={subtractImgPath} className={styles.priceIcon} alt="Кристаллы" />
                </div> 
                    <Button
                        type="primary"
                        size="large"
                        htmlType={"button"}
                        onClick={props.buyHandler}
                        data-cy="orderButton"
                    >
                        Оформить заказ
                    </Button>
            </article>
        </section>
    );
}
