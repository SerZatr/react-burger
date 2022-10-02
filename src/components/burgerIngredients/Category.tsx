import { Element } from "react-scroll";
import { IIngredientsInCart } from "../../App";
import { IIngredient } from "../../utils/ingredientType";
import styles from "./burgerIngredients.module.css";
import { Ingredient } from "./Ingredient";

export interface ICategory {
    title: string;
    ingredients: IIngredient[];
    addIngredient: (ingredient: IIngredient) => void;
    ingredientsInCart: IIngredientsInCart;
    categorieName: string;
}

export function Category(props: ICategory) {
    const getIngredients = () => {
        let ingredients = [];
        for (let i=0; i<props.ingredients.length; i++) {
            const ingredient = props.ingredients[i];
            const id = ingredient._id;
            let count = 0;
            if (ingredient.type !== "bun") {
                count = props.ingredientsInCart.ingredients?.[id]?.count ?? 0;
            } else {
                const buns = props.ingredientsInCart.bunIngredients;
                const bunsInCart = buns.filter( b => b._id === ingredient._id );
                count = bunsInCart?.length ?? 0;
            }
            ingredients.push(
                <Ingredient
                    name={ingredient.name}
                    image={ingredient.image}
                    price={ingredient.price}
                    countInCart={count}
                    addIngredient={ () => props.addIngredient(ingredient) }
                    key={i + ingredient._id}
                />
            );
        }
        return ingredients;
    }

    return (
        <Element name={props.title}>
            <section>
                <p className = {`text text_type_main-medium mb-6`}>
                    {props.title}
                </p>
                <section className={`pl-4 mb-2 ${styles.categoryItems}`}>
                    { getIngredients() }
                </section>
            </section>
        </Element>

    )

}