import { createAction } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/constants";

export const setIngredientDetails = createAction("ingredientDetails/set", (ingredient: IIngredient) => {
    return {
        payload: {
            ingredient
        }
    }
});

export const clearIngredientDetails = createAction("ingredientDetails/clear");
