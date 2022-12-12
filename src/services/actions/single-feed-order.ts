import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { BASE_URL, orderFeedData } from "../../utils/constants";
import { request } from "../../utils/request";

interface IResponse {
    orders: orderFeedData[];
}

export const singleFeedOrderRequest = createAction("singleFeedOrder/request");

export const singleFeedOrderSuccess = createAction("singleFeedOrder/success", (data: orderFeedData) => {
    return {
        payload: {
            data
        }
    }
});

export const singleFeedOrderError = createAction("singleFeedOrder/failed");

export function getFeedOrderByNumber(number: string) {
    return async function(dispatch: Dispatch) {
        dispatch(singleFeedOrderRequest());
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const url = `${BASE_URL}/orders/${number}`;
                const options = {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                };
                const response = (await request(url, options)) as IResponse;
                const {orders} = response;
                console.log(orders);
                if (orders[0]) {
                    dispatch(singleFeedOrderSuccess(orders[0]));
                }
            }
        } catch (error) {
            dispatch(singleFeedOrderError());
        }
    } as unknown as AnyAction;
};
