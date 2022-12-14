import { AnyAction, createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../..";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { IUser } from "./register";

interface IResponse {
    user: IUser
}

export const profileUpdateRequest = createAction("profileUpdate/post", (login: string, name: string, password: string) => {
    return {
        payload: {
            login,
            name,
            password
        }
    }
});

export const profileUpdateSuccess = createAction("profileUpdate/success", (user: IUser) => {
    return {
        payload: {
            user
        }
    }
});
export const profileUpdateError = createAction("profileUpdate/failed");

export function updateProfile(login: string, name: string, password: string) {
    return async function(dispatch: AppDispatch ) {
        dispatch(profileUpdateRequest(login, name, password));
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const url = BASE_URL + "/auth/user";
                const options = {
                    method: "PATCH",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({login, name, password})
                };
                const response = (await request(url, options)) as IResponse;
                const {user} = response;
                if (user) {
                    dispatch(profileUpdateSuccess(user));
                }
            } catch (error) {
                dispatch(profileUpdateError());
            }
        }
    } as unknown as AnyAction;
};
