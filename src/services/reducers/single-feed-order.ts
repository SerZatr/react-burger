import { createReducer } from "@reduxjs/toolkit";
import { orderFeedData } from "../../utils/constants";
import { singleFeedOrderError, singleFeedOrderRequest, singleFeedOrderSuccess } from "../actions/single-feed-order";

export const initialState = {
    data: undefined as orderFeedData | undefined,
    request: false,
    error: false
};

export interface IProfileState {
    profile: typeof initialState
};

export const singleFeedOrder = createReducer(initialState, builder => {
    builder
        .addCase(singleFeedOrderRequest, (state) => {
            state.request = true;
            state.error = false;
        })
        .addCase(singleFeedOrderSuccess, (state, action) => {
            state.request = false;
            state.error = false;
            state.data = action.payload.data;
        })
        .addCase(singleFeedOrderError, (state) => {
            state.request = false;
            state.error = true;
        })
});