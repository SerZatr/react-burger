import { createReducer } from "@reduxjs/toolkit";

import { postOrderRequest, postOrderSuccess, postOrderError } from "../actions/order";

const initialState = {
    id: undefined as undefined | number,
    request: false,
    error: false
};

export interface IOrderState {
    order: typeof initialState
};

export const order = createReducer(initialState, builder => {
    builder
        .addCase(postOrderRequest, (state) => {
            state.request = true;
            state.error = false;
            state.id = undefined;
        })
        .addCase(postOrderSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.id = action.payload.orderId;
        })
        .addCase(postOrderError, (state, action) => {
            state.request = false;
            state.error = false;
            state.id = initialState.id;
        });
});