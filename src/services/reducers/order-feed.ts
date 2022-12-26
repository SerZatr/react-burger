import { createReducer } from "@reduxjs/toolkit";
import { orderFeed } from "../../utils/constants";
import { onClose, onError, onMessage, onOpen, wsClose, wsInit } from "../actions/order-feed";
export const initialState = {
    wsConnected: false,
    error: false,
    data: {} as orderFeed
  };

export interface IOrderFeedDataState {
    orderFeed: typeof initialState
};

export const orderFeedReducer = createReducer(initialState, builder => {
    builder
        .addCase(onOpen, (state, action) => {
            state.wsConnected = true;
            state.error = false;
        })
        .addCase(onClose, (state, action) => {
            state.data = initialState.data;
            state.wsConnected = false;
            state.error = false;
        })
        .addCase(wsClose, (state, action) => {
            state.data = initialState.data;
            state.wsConnected = false;
            state.error = false;
        })
        .addCase(wsInit, (state, action) => {
            state.data = initialState.data;
            state.wsConnected = false;
            state.error = false;
        })
        .addCase(onError, (state, action) => {
            state.data = initialState.data;
            state.wsConnected = false;
            state.error = true;
        })
        .addCase(onMessage, (state, action) => {
            state.wsConnected = true;
            state.error = false;
            state.data = action.payload.orderFeedData;
        });
});


