import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { IUser } from "./register";

interface IResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string
}

export const loginRequest = createAction("login/post", (email: string, password: string) => {
    return {
        payload: {
            email,
            password
        }
    }
});

export const loginSuccess = createAction("login/success", (user: IUser, accessToken: string, refreshToken: string) => {
    return {
        payload: {
            user,
            accessToken,
            refreshToken
        }
    }
});

export const loginError = createAction("login/failed");

export function login(email: string, password: string) {
    return async function(dispatch: Dispatch) {
        dispatch(loginRequest(email, password));
        try {
            const url = BASE_URL + "/auth/login";
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            };
            const response = (await request(url, options)) as IResponse;
            const {user, accessToken, refreshToken} = response;
            if (user && accessToken && refreshToken) {
                dispatch(loginSuccess(user, accessToken, refreshToken));
            }
        } catch (error) {
            dispatch(loginError());
        }
    } as unknown as AnyAction;
};
