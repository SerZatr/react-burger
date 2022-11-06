import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";

export const restoreRequest = createAction("restorePassword/post", (email: string) => {
    return {
        payload: {
            email
        }
    }
});

export const restoreSuccess = createAction("restorePassword/success", (message: string) => {
    return {
        payload: {
            message
        }
    }
});

export const restoreError = createAction("restorePassword/failed");
export const restoreClear = createAction("restorePassword/clear");

export function restorePassword(email: string) {
    return async function(dispatch: Dispatch) {
        dispatch(restoreRequest(email));
        try {
            const url = BASE_URL + "/password-reset";
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            };
            const response = (await request(url, options));
            if (response) {
                const message = response.message as string;
                dispatch(restoreSuccess(message));
            }
        } catch (error) {
            dispatch(restoreError());
        }
    } as unknown as AnyAction;
};
