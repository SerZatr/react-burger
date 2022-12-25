import { createReducer } from "@reduxjs/toolkit";

import { addIngredient, changeIngredientPosition, removeIngredient, addBun, replaceBun, setIngredientsFromStorage } from "../actions/cart";

interface ICartIngredient {
    ingredientId: string,
    uuid: string
}

export const initialState = {
    ingredients: [] as ICartIngredient[],
    bun: undefined as undefined | string
};

export interface ICartState {
    cart: typeof initialState
};

export const cart = createReducer(initialState, builder => {
    builder
        .addCase(addIngredient, (state, action) => {
            state.ingredients = [...state?.ingredients, {ingredientId: action.payload?.id, uuid: action.payload?.uuid}];
            localStorage.setItem("ingredientsInCart", JSON.stringify(state));
        })
        .addCase(removeIngredient, (state, action) => {
            state.ingredients.splice(action.payload.index, 1);
            localStorage.setItem("ingredientsInCart", JSON.stringify(state));
        })
        .addCase(changeIngredientPosition, (state, action) => {
            const ingredient = state.ingredients[action.payload.oldIndex];
            state.ingredients.splice(action.payload.oldIndex, 1);
            state.ingredients.splice(action.payload.newIndex, 0, ingredient);
            localStorage.setItem("ingredientsInCart", JSON.stringify(state));
        })
        .addCase(addBun, (state, action) => {
            state.bun = action.payload.id;
            localStorage.setItem("ingredientsInCart", JSON.stringify(state));
        })
        .addCase(replaceBun, (state, action) => {
            state.bun = action.payload.id;
            localStorage.setItem("ingredientsInCart", JSON.stringify(state));
        })
        .addCase(setIngredientsFromStorage, (state, action) => {
            const data = JSON.parse(localStorage.getItem("ingredientsInCart") ?? "") as typeof initialState;
            if (data) {
                state.ingredients = data.ingredients ?? [];
                state.bun = data.bun;
            }
        });
});