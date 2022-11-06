import { createReducer } from "@reduxjs/toolkit";

import { refreshTokenRequest, refreshTokenSuccess, refreshTokenError } from "../actions/refresh-token";

const initialState = {
    accessToken: "",
    refreshTokenToken: "",
    request: false,
    error: false
};

export interface IrefreshTokenState {
    refreshToken: typeof initialState
};

export const refreshToken = createReducer(initialState, builder => {
    builder
        .addCase(refreshTokenRequest, (state) => {
            state.request = true;
            state.error = false;
        })
        .addCase(refreshTokenSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.accessToken = action.payload.accessToken;
            state.refreshTokenToken = action.payload.refreshToken;
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        })
        .addCase(refreshTokenError, (state) => {
            state.request = false;
            state.error = true;
        });
});