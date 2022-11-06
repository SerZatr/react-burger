import styles from "./ingredient-details.module.css";
import mainStyles from "../app/app.module.css";
import DescriptionItem from "./description-item";
import { useSelector } from "react-redux";
import { IIngredientDetailsState } from "../../services/reducers/ingredientDetails";

export default function IngredientDetails() {
    const ingredientDetails = useSelector((state: IIngredientDetailsState) => state.ingredientDetails.ingredient);
    return (
        <section>
            <article className={`${styles.ingredientDetails} mb-5`}>
                <img src={ingredientDetails?.image_large} className="mb-4" alt={`${ingredientDetails?.name}`} />
                <p className={`${styles.title} mb-8 text text_type_main-medium`}>
                    {ingredientDetails?.name}
                </p>
                <div className={`${styles.description} ${mainStyles.secondaryTxt}`}>
                    <DescriptionItem name="Калории, ккал" property={ingredientDetails?.calories ?? 0} />
                    <DescriptionItem name="Белки, г" property={ingredientDetails?.proteins ?? 0} />
                    <DescriptionItem name="Жиры, г" property={ingredientDetails?.fat ?? 0} />
                    <DescriptionItem name="Углеводы, г" property={ingredientDetails?.proteins ?? 0} />
                </div>
            </article>
        </section>
    );
}