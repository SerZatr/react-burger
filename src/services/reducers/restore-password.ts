import { createReducer } from "@reduxjs/toolkit";

import { restoreRequest, restoreSuccess, restoreError, restoreClear } from "../actions/restore-password";

export const initialState = {
    message: "",
    request: false,
    error: false
};

export interface IRestorePasswordState {
    restorePassword: typeof initialState
};

export const restorePassword = createReducer(initialState, builder => {
    builder
        .addCase(restoreRequest, (state) => {
            state.request = true;
            state.error = false;
            state.message = initialState.message;
        })
        .addCase(restoreSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.message = action.payload.message;
        })
        .addCase(restoreError, (state) => {
            state.request = false;
            state.error = true;
            state.message = initialState.message;
        })
        .addCase(restoreClear, (state) => {
            state.request = initialState.request;
            state.error = initialState.error;
            state.message = initialState.message;
        })
});