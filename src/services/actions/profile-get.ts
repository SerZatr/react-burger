import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { IUser } from "./register";

interface IResponse {
    user: IUser
}

export const profileGetRequest = createAction("profileGet/post");

export const profileGetSuccess = createAction("profileGet/success", (user: IUser) => {
    return {
        payload: {
            user
        }
    }
});

export const profileGetError = createAction("profileGet/failed");

export function getProfile() {
    return async function(dispatch: Dispatch) {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                dispatch(profileGetRequest());
                const url = BASE_URL + "/auth/user";
                const options = {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                };
                const response = (await request(url, options)) as IResponse;
                const {user} = response;
                if (user) {
                    dispatch(profileGetSuccess(user));
                }
            }
        } catch (error) {
            dispatch(profileGetError());
        }
    } as unknown as AnyAction;
};
