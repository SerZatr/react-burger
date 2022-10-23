import { createReducer } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/ingredient-type";
import { setIngredientDetails, clearIngredientDetails } from "../actions/ingredientDetails";

const initialState = {
    ingredient: undefined as IIngredient | undefined
};

export interface IIngredientDetailsState {
    ingredientDetails: typeof initialState
};

export const ingredientDetails = createReducer(initialState, builder => {
    builder
        .addCase(setIngredientDetails, (state, action) => {
            state.ingredient = action.payload.ingredient
        })
        .addCase(clearIngredientDetails, (state, action) => {
            state.ingredient = undefined
        });
});