import { createReducer } from "@reduxjs/toolkit";

import { resetRequest, resetSuccess, resetError } from "../actions/reset-password";

export const initialState = {
    message: "",
    request: false,
    error: false
};

export interface IResetPasswordState {
    resetPassword: typeof initialState
};

export const resetPassword = createReducer(initialState, builder => {
    builder
        .addCase(resetRequest, (state) => {
            state.request = true;
            state.error = false;
            state.message = "";
        })
        .addCase(resetSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.message = action.payload.message;
        })
        .addCase(resetError, (state) => {
            state.request = false;
            state.error = true;
        });
});