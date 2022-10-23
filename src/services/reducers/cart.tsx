import { createReducer } from "@reduxjs/toolkit";

import { addIngredient, changeIngredientPosition, removeIngredient, addBun, replaceBun } from "../actions/cart";

export const initialState = {
    ingredients: [] as string[],
    bun: undefined as undefined | string
};

export interface ICartState {
    cart: typeof initialState
};

export const cart = createReducer(initialState, builder => {
    builder
        .addCase(addIngredient, (state, action) => {
            state.ingredients = [...state.ingredients, action.payload.id];
        })
        .addCase(removeIngredient, (state, action) => {
            state.ingredients.splice(action.payload.index, 1);
        })
        .addCase(changeIngredientPosition, (state, action) => {
            const ingredient = state.ingredients[action.payload.oldIndex];
            state.ingredients.splice(action.payload.oldIndex, 1);
            state.ingredients.splice(action.payload.newIndex, 0, ingredient);
        })
        .addCase(addBun, (state, action) => {
            state.bun = action.payload.id;
        })

        .addCase(replaceBun, (state, action) => {
            state.bun = action.payload.id;
        });
});