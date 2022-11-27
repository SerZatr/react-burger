import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";

export interface IUser {
    email: string,
    name: string
}
interface IResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string
}

export const registerRequest = createAction("register/post", (email: string, password: string, name: string) => {
    return {
        payload: {
            email,
            password,
            name
        }
    }
});

export const registerSuccess = createAction("register/success", (user: IUser, accessToken: string, refreshToken: string) => {
    return {
        payload: {
            user,
            accessToken,
            refreshToken
        }
    }
});

export const registerError = createAction("register/failed");

export function registerUser(email: string, password: string, name: string) {
    return async function(dispatch: Dispatch) {
        dispatch(registerRequest(email, password, name));
        try {
            const url = BASE_URL + "/auth/register";
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password, name})
            };
            const response = (await request(url, options)) as IResponse;
            const {user, accessToken, refreshToken} = response;
            if (user && accessToken && refreshToken) {
                dispatch(registerSuccess(user, accessToken, refreshToken));
            }
        } catch (error) {
            dispatch(registerError());
        }
    } as unknown as AnyAction;
};
