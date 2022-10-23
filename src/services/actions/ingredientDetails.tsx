import { createAction } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/ingredient-type";

export const setIngredientDetails = createAction("ingredientDetails/set", (ingredient: IIngredient) => {
    return {
        payload: {
            ingredient
        }
    }
});

export const clearIngredientDetails = createAction("ingredientDetails/clear");
