import { AnyAction, createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../..";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { IUser } from "./register";

interface IResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string
}
// use refreshToken
export const refreshTokenRequest = createAction("refreshToken/post", (token: string) => {
    return {
        payload: {
            token
        }
    }
});

export const refreshTokenSuccess = createAction("refreshToken/success", (user: IUser, accessToken: string, refreshToken: string) => {
    return {
        payload: {
            user,
            accessToken,
            refreshToken
        }
    }
});

export const refreshTokenError = createAction("refreshToken/failed");

export function getRefreshToken(token: string) {
    return async function(dispatch: AppDispatch ) {
        dispatch(refreshTokenRequest(token));
        try {
            const url = BASE_URL + "/auth/refreshToken";
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token})
            };
            const response = (await request(url, options)) as IResponse;
            const {user, accessToken, refreshToken} = response;
            if (user && accessToken && refreshToken) {
                dispatch(refreshTokenSuccess(user, accessToken, refreshToken));
            }
        } catch (error) {
            dispatch(refreshTokenError());
        }
    } as unknown as AnyAction;
};
