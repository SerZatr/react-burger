import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/ingredient-type";

export const postOrderRequest = createAction("order/post", (ingredients: IIngredient[]) => {
    return {
        payload: {
            ingredients
        }
    }
});

export const postOrderSuccess = createAction("order/success", (orderId: number) => {
    return {
        payload: {
            orderId
        }
    }
});

export const postOrderError = createAction("order/failed");

export function postOrder(ingredients: IIngredient[]) {
    return async function(dispatch: Dispatch) {
        dispatch(postOrderRequest(ingredients));
        try {
            const url = "https://norma.nomoreparties.space/api/orders";
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ingredients: ingredients})
            };
            if (ingredients.length === 0) {
                throw new Error("Заказ не может быть пустым");
            } else {
                const response = await fetch(url, options);
                if(response.ok) {
                    const json = await response.json();
                    const orderId: number = json.order.number as number;
                    dispatch(postOrderSuccess(orderId));
                } else {
                    throw new Error("Не удалось отправить заказ. Попробуйте повторить позже.");
                }
            }
        } catch (error) {
            dispatch(postOrderError());
            console.log(`${error}`);
        }
    } as unknown as AnyAction
};