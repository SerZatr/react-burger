import { IIngredientsInCart } from "../app/app";
import { IIngredient } from "../../utils/ingredient-type";
import styles from "./burger-ingredients.module.css";
import { Ingredient } from "./ingredient";

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
                    key={ingredient._id}
                />
            );
        }
        return ingredients;
    }

    return (
        <section>
            <p className = {`text text_type_main-medium mb-6`}>
                {props.title}
            </p>
            <section className={`pl-4 mb-2 ${styles.categoryItems}`}>
                { getIngredients() }
            </section>
        </section>
    )

}