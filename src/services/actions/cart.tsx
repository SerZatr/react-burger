import { createAction } from "@reduxjs/toolkit";

export const addIngredient = createAction("cart/addIngredient", (id: string) => {
    return {
        payload: {
            id
        }
    }
});

export const removeIngredient = createAction("cart/removeIngredient", (index: number) => {
    return {
        payload: {
            index
        }
    }
});

export const addBun = createAction("cart/addBun", (id: string) => {
    return {
        payload: {
            id
        }
    }
});

export const replaceBun = createAction("cart/replaceBun", (id: string) => {
    return {
        payload: {
            id
        }
    }
});

export const changeIngredientPosition = createAction("cart/changeIngrefientPosition", (oldIndex: number, newIndex: number) => {
    return {
        payload: {
            oldIndex,
            newIndex
        }
    }
});