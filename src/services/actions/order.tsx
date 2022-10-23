import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { BASE_URL, IIngredient } from "../../utils/constants";
import { request } from "../../utils/request";

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
            const url = BASE_URL + "/orders";
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
                const response = (await request(url, options)).data;
                if(response) {
                    const orderId = response.number as number;
                    dispatch(postOrderSuccess(orderId));
                }
            }
        } catch (error) {
            dispatch(postOrderError());
        }
    } as unknown as AnyAction;
};
