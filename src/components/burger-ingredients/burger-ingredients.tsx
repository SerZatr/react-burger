import { useState } from "react";
import styles from "./burger-ingredients.module.css"
import mainStyles from "../../main.module.css"
import { Category } from "./category";
import { categories } from "../../utils/categories";
import { IIngredient } from "../../utils/ingredient-type";
import { IIngredientsInCart } from "../app/app";
import { Tabs } from "./tabs";

interface IburgerIngredientsProps {
    addIngredient: (ingredient: IIngredient) => void;
    categoriesData: {[key: string]: IIngredient[]}
    ingredientsInCart: IIngredientsInCart;
}

export default function BurgerIngredients(props: IburgerIngredientsProps) {
    const [current, setCurrent] = useState(categories.bun);

    const getCategorieElements = () => {
        let categorieElements: JSX.Element[] = [];
        for (let k in Object.keys(props.categoriesData)) {
            let categorieName = Object.keys(props.categoriesData)[k];
            let categorie = props.categoriesData[categorieName];
            let ingredients = [];
            for (let key in categorie) {
                const ingredient = categorie[key];
                ingredients.push(ingredient);
            }
            if (ingredients.length > 0) {
                categorieElements.push(
                    <Category
                        categorieName={categorieName}
                        title={categories[categorieName]}
                        ingredients={ingredients}
                        ingredientsInCart={props.ingredientsInCart}
                        key={k + "category"}
                        addIngredient={props.addIngredient}
                    />
                );
            }
        }
        return categorieElements;
    };

    return (
            <section className={`mt-10 ${styles.ingredientsSection} ${mainStyles.section}`}>
                <h1 className = {`text text_type_main-large mb-5 ${styles.header}`}>
                    Соберите бургер
                </h1>

                <nav className={`mb-10 ${styles.tabs}`}>
                    <Tabs
                        tabNames={Object.values(categories)}
                        activeTab={current}
                        callback={ () => setCurrent(current) }
                    />
                </nav>
                <section className={`${styles.categories} ${mainStyles.customScrollbar}`}>
                    { getCategorieElements() }
                </section>

            </section>

    );
}