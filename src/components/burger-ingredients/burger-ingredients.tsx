import { useContext, useState } from "react";
import styles from "./burger-ingredients.module.css"
import { Category } from "./category";
import { IIngredient } from "../../utils/ingredient-type";
import { Tabs } from "./tabs";
import { IngredientsDataContext } from "../../services/data-context";

interface IburgerIngredientsProps {
    openIngredientModal: (ingredient: IIngredient) => void;
}

const categories: {[key: string]: string} = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинка"
}

export default function BurgerIngredients(props: IburgerIngredientsProps) {
    const [current, setCurrent] = useState(categories.bun);
    const {ingredientsData} = useContext(IngredientsDataContext);

    const getDataByCategorie = () => {
        const dataByCategories: {[categoryName: string]: IIngredient[]} = {};
        for (let key in ingredientsData) {
            let item = ingredientsData[+key];
            if (!dataByCategories[item.type]) {
                dataByCategories[item.type] = [];
            }
            dataByCategories[item.type].push(item);
        };
        return dataByCategories;
    }

    const getCategorieElements = () => {
        const dataByCategorie = getDataByCategorie();
        let categorieElements: JSX.Element[] = [];
        for (let k in Object.keys(dataByCategorie)) {
            const categorieName = Object.keys(dataByCategorie)[k];
            const categorie = dataByCategorie[categorieName];
            let ingredientsIds: string[] = [];
            for (let key in categorie) {
                const ingredient = categorie[key];
                ingredientsIds.push(ingredient._id);
            }
            if (ingredientsIds.length > 0) {
                categorieElements.push(
                    <Category
                        categoryName={categorieName}
                        title={categories[categorieName]}
                        ingredientsIds={ingredientsIds}
                        key={k + "category"}
                        openIngredientModal={props.openIngredientModal}
                    />
                );
            }
        }
        return categorieElements;
    };

    return (
            <section className={`mt-10 ${styles.ingredientsSection} section`}>
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
                <section className={`${styles.categories} customScrollbar`}>
                    { getCategorieElements() }
                </section>
            </section>
    );
}
