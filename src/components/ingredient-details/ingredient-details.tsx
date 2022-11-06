import styles from "./ingredient-details.module.css";
import mainStyles from "../app/app.module.css";
import DescriptionItem from "./description-item";
import { useSelector } from "react-redux";
import { IIngredientDetailsState } from "../../services/reducers/ingredient-details";
import { useParams } from "react-router-dom";
import { IIngredientsDataState } from "../../services/reducers/ingredients-data";
import { useEffect, useState } from "react";
import { IIngredient } from "../../utils/constants";

export default function IngredientDetails() {

    const [ingredient, setIngredient] = useState<IIngredient | undefined>();
    const ingredientDetails = useSelector((state: IIngredientDetailsState) => state.ingredientDetails);
    const ingredientsData = useSelector((state: IIngredientsDataState) => state.ingredients.data);
    const { ingredientId } = useParams() as {ingredientId: string};

    useEffect(() => {
        setIngredient(ingredientDetails?.ingredient);
    }, [ingredientDetails]);

    useEffect(() => {
        if (!ingredientDetails.ingredient && ingredientsData) {
            const newIngredient = ingredientsData.filter( i => i._id === ingredientId)[0];
            setIngredient(newIngredient);
        }
    }, [ingredientsData, ingredientDetails.ingredient, ingredientId]);

    if(!ingredient) {
        return null;
    } else {
        return (
            <section>
                <article className={`${styles.ingredientDetails} mb-5`}>
                    <img src={ingredient.image_large} className="mb-4" alt={`${ingredient.name}`} />
                    <p className={`${styles.title} mb-8 text text_type_main-medium`}>
                        {ingredient.name}
                    </p>
                    <div className={`${styles.description} ${mainStyles.secondaryTxt}`}>
                        <DescriptionItem name="Калории, ккал" property={ingredient.calories ?? 0} />
                        <DescriptionItem name="Белки, г" property={ingredient.proteins ?? 0} />
                        <DescriptionItem name="Жиры, г" property={ingredient.fat ?? 0} />
                        <DescriptionItem name="Углеводы, г" property={ingredient.proteins ?? 0} />
                    </div>
                </article>
            </section>
        );
    }
}