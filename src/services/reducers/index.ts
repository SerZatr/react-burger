
import { combineReducers } from "@reduxjs/toolkit";
import { cart } from "./cart";
import { ingredientsData } from "./ingredients-data";
import { ingredientDetails } from "./ingredient-details";
import { order } from "./order";
import { refreshToken } from "./refresh-token";
import { profile } from "./profile";
import { restorePassword } from "./restore-password";
import { resetPassword } from "./reset-password";
import { orderFeedReducer } from "./order-feed";
import { singleFeedOrder } from "./single-feed-order";

export const rootReducer = combineReducers({
    ingredients: ingredientsData,
    order: order,
    cart: cart,
    ingredientDetails: ingredientDetails,
    refreshToken: refreshToken,
    profile: profile,
    restorePassword: restorePassword,
    resetPassword: resetPassword,
    orderFeed: orderFeedReducer,
    singleFeedOrder: singleFeedOrder
});