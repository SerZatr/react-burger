import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css"
import mainStyles from "../../main.module.css"
import { Items } from "./Items";
import { IIngredient } from "../../utils/ingredientType";
import { IIngredientsInCart } from "../../App";
import subtractImgPath from "../../images/subtract.svg";

interface IConstructorProps {
    ingredientsInCart: IIngredientsInCart;
    removeIngredient: (ingredient: IIngredient) => void;
    totalPrice: number;
}

export default function BurgerConstructor(props: IConstructorProps) {
    return (
            <section className={`mt-25  ${mainStyles.section}`} style={{height: "calc(100vh - 220px)"}}>
                <section className={`mb-6 ${mainStyles.customScrollbar}`}>
                    <Items
                        ingredientsInCart={props.ingredientsInCart}
                        removeIngredient={props.removeIngredient}
                    />
                </section>
                <section className={`pr-4 pl-4 ${styles.buySectionWrapper}`}>
                    <section className={`mr-10 ${styles.priceSection} `}>
                            <p className="text text_type_digits-medium">
                                {props.totalPrice}
                            </p>
                            <img src={subtractImgPath} className={styles.priceIcon} alt="Кристаллы" />
                    </section> 
                        <Button type="primary" size="large" htmlType={"button"}>
                            Оформить заказ
                        </Button>
                </section>
            </section>
    );
}