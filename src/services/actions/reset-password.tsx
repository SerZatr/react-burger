import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";

export const resetRequest = createAction("resetPassword/post", (password: string, token: string) => {
    return {
        payload: {
            password,
            token
        }
    }
});

export const resetSuccess = createAction("resetPassword/success", (message: string) => {
    return {
        payload: {
            message
        }
    }
});

export const resetError = createAction("resetPassword/failed");

export function resetPassword(password: string, token: string) {
    return async function(dispatch: Dispatch) {
        dispatch(resetRequest(password, token));
        try {
            const url = BASE_URL + "/password-reset/reset";
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password, token})
            };
            const response = (await request(url, options));
            if(response) {
                const message = response.message as string;
                dispatch(resetSuccess(message));
            }
        } catch (error) {
            dispatch(resetError());
        }
    } as unknown as AnyAction;
};
