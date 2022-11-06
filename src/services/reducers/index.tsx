
import { combineReducers } from "@reduxjs/toolkit";
import { cart } from "./cart";
import { ingredientsData } from "./ingredientsData";
import { ingredientDetails } from "./ingredientDetails";
import { order } from "./order";

export const rootReducer = combineReducers({
    ingredients: ingredientsData,
    order: order,
    cart: cart,
    ingredientDetails: ingredientDetails
});