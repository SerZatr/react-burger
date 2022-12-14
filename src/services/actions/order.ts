import { AnyAction, createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../..";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";

export const postOrderRequest = createAction("order/post", (ingredients: string[]) => {
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

export function postOrder(ingredients: string[]) {
    return async function(dispatch: AppDispatch) {
        dispatch(postOrderRequest(ingredients));
        try {
            const token = localStorage.getItem("accessToken");
            const url = BASE_URL + "/orders?token=" + token;
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token ?? ""
                },
                body: JSON.stringify({ingredients: ingredients})
            };
            if (ingredients.length === 0) {
                throw new Error("Заказ не может быть пустым");
            } else {
                const response = (await request(url, options)).order;
                if (response) {
                    const orderId = response.number as number;
                    dispatch(postOrderSuccess(orderId));
                }
            }
        } catch (error) {
            dispatch(postOrderError());
        }
    } as unknown as AnyAction;
};
