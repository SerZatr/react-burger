import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from "./ingredient-info.module.css";

export default function IngredientInfoPage() {
    return (
        <main className={styles.ingredientInfo}>
            <IngredientDetails />
        </main>
    )
}