import { AnyAction, createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../..";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";

interface IResponse {
    message: string
}

export const logoutRequest = createAction("logout/post");

export const logoutSuccess = createAction("logout/success", (message: string) => {
    return {
        payload: {
            message
        }
    }
});

export const logoutError = createAction("logout/failed");

export function logout() {
    return async function(dispatch: AppDispatch ) {
        dispatch(logoutRequest());
        try {
            const url = BASE_URL + "/auth/logout";
            const token = localStorage.getItem("refreshToken");
            if (token) {
                const options = {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({token})
                };
                const response = (await request(url, options)) as IResponse;
                const {message} = response;
                if (message) {
                    dispatch(logoutSuccess(message));
                }
            }
        } catch (error) {
            dispatch(logoutError());
        }
    } as unknown as AnyAction;
};
