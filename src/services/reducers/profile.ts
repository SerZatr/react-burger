import { createReducer } from "@reduxjs/toolkit";
import { IUser, registerError, registerRequest, registerSuccess } from "../actions/register";

import { profileGetRequest, profileGetSuccess, profileGetError } from "../actions/profile-get";
import { profileUpdateRequest, profileUpdateSuccess, profileUpdateError } from "../actions/profile-update";
import { loginRequest, loginSuccess, loginError } from "../actions/login";
import { logoutRequest, logoutSuccess, logoutError } from "../actions/logout";

export const initialState = {
    user: undefined as IUser | undefined,
    request: false,
    error: false,
    accessToken: "",
    refreshToken: ""
};

export interface IProfileState {
    profile: typeof initialState
};

export const profile = createReducer(initialState, builder => {
    builder
        .addCase(profileGetRequest, (state) => {
            state.request = true;
            state.error = false;
        })
        .addCase(profileGetSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.user = action.payload.user;
        })
        .addCase(profileGetError, (state) => {
            state.request = false;
            state.error = true;
        })
        .addCase(profileUpdateRequest, (state) => {
            state.request = true;
            state.error = false;
        })
        .addCase(profileUpdateSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.user = action.payload.user;
        })
        .addCase(profileUpdateError, (state) => {
            state.request = false;
            state.error = true;
        })
        .addCase(loginRequest, (state) => {
            state.request = true;
            state.error = false;
        })
        .addCase(loginSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("accessToken", action.payload.accessToken);
        })
        .addCase(loginError, (state) => {
            state.request = false;
            state.error = true;
            state.accessToken = "";
            state.refreshToken = "";
        })
        .addCase(logoutRequest, (state) => {
            state.request = true;
            state.error = false;
        })
        .addCase(logoutSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.accessToken = "";
            state.refreshToken = "";
            localStorage.clear();
            state.user = initialState.user;
        })
        .addCase(logoutError, (state) => {
            state.request = false;
            state.error = true;
        })
        .addCase(registerRequest, (state) => {
            state.request = true;
            state.error = false;
        })
        .addCase(registerSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        })
        .addCase(registerError, (state) => {
            state.request = false;
            state.error = true;
            state.accessToken = "";
            state.refreshToken = "";
        });
});