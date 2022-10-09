import { IIngredient } from "../../utils/ingredient-type";
import styles from "./ingredient-details.module.css";
import mainStyles from "../app/app.module.css";
import DescriptionItem from "./description-item";

interface IModalProps {
    ingredient: IIngredient;
    closeHandler: () => void;
}

export default function IngredientDetails(props: IModalProps) {
    return (
        <section>
            <article className={`${styles.ingredientDetails} mb-5`}>
                <img src={props.ingredient?.image_large} className="mb-4" alt={`${props.ingredient.name}`} />
                <p className={`${styles.title} mb-8 text text_type_main-medium`}>
                    {props.ingredient?.name}
                </p>
                <div className={`${styles.description} ${mainStyles.secondaryTxt}`}>
                    <DescriptionItem name="Калории, ккал" property={props.ingredient?.calories} />
                    <DescriptionItem name="Белки, г" property={props.ingredient?.proteins} />
                    <DescriptionItem name="Жиры, г" property={props.ingredient?.fat} />
                    <DescriptionItem name="Углеводы, г" property={props.ingredient?.proteins} />
                </div>
            </article>
        </section>
    );
}