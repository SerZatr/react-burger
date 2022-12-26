import { createReducer } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/constants";
import { setIngredientDetails, clearIngredientDetails } from "../actions/ingredient-details";

export const initialState = {
    ingredient: undefined as IIngredient | undefined
};

export interface IIngredientDetailsState {
    ingredientDetails: typeof initialState
};

export const ingredientDetails = createReducer(initialState, builder => {
    builder
        .addCase(setIngredientDetails, (state, action) => {
            console.log(action.payload.ingredient);
            state.ingredient = action.payload.ingredient
        })
        .addCase(clearIngredientDetails, (state, action) => {
            state.ingredient = undefined
        });
});