import { createReducer } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/constants";
import { getIngredientsRequest, getIngredientsError, getIngredientsSuccess  } from "../actions/ingredientsData";

const initialState = {
    data: [] as IIngredient[],
    request: false,
    error: false
};

export interface IIngredientsDataState {
    ingredients: typeof initialState
};

export const ingredientsData = createReducer(initialState, builder => {
    builder
        .addCase(getIngredientsRequest, (state, action) => {
            state.request = true;
            state.error = false;
        })
        .addCase(getIngredientsSuccess, (state, action) => {
            state.data = action.payload.ingredientsData;
            state.request = false;
            state.error = false;
        })
        .addCase(getIngredientsError, (state, action) => {
            state.request = false;
            state.error = true;
            state.data = initialState.data;
        });
});