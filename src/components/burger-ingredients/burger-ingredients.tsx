import { useRef, useState } from "react";
import styles from "./burger-ingredients.module.css"
import { Category } from "./category";
import { IIngredient } from "../../utils/constants";
import { Tabs } from "./tabs";
import { useSelector } from 'react-redux';
import { IIngredientsDataState } from "../../services/reducers/ingredientsData";

const categories: {[key: string]: string} = {
    bun: "Булки",
    main: "Начинка",
    sauce: "Соусы"
}

interface IHeights {
    [category: string]: number
};

export default function BurgerIngredients() {
    const [current, setCurrent] = useState(categories.bun);
    const ingredientsData = useSelector((state: IIngredientsDataState) => state.ingredients.data);
    const categorieElementsRefs: {element: HTMLDivElement , name: string}[] = [];
    const categoriesContainerRef = useRef(null);
    const [heights, setHeights] = useState<IHeights>();

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
    };

    const getHeights = () => {
        let heights: IHeights = {};
        categorieElementsRefs.forEach( (obj, index) => {
            const {element} = obj;
            const bounds = element.getBoundingClientRect();
            heights[index] = bounds.height;
        });
        setHeights(heights);
        return heights;
    };

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
                    <div
                        ref={((element: HTMLDivElement) => {
                            categorieElementsRefs.push({element: element, name: categorieName});
                        })}
                        key={k + "category"}
                    >
                    <Category
                        categoryName={categorieName}
                        title={categories[categorieName]}
                        ingredientsIds={ingredientsIds}
                    />
                    </div>

                );
            }
        }
        return categorieElements;
    };

    const setActiveTab = (event: React.UIEvent<HTMLDivElement>) => {
        const categorieHeights = heights ?? getHeights();
        const container = categoriesContainerRef.current as unknown as HTMLDivElement;
        const scrolled = container.scrollTop;
        let elementsHeight = 0;
        for (let key in categorieHeights) {
            elementsHeight += categorieHeights[key];
            if (scrolled < elementsHeight) {
                const name = categorieElementsRefs[+key].name;
                if(current !== categories[name]) {
                    setCurrent(categories[name]);
                }
                break;
            }
        }
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
                <section className={`${styles.categories} customScrollbar`} onScroll={setActiveTab} ref={categoriesContainerRef}>
                    { getCategorieElements() }
                </section>
            </section>
    );
}
