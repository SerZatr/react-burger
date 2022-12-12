import { createAction } from "@reduxjs/toolkit";
import { orderFeed } from "../../utils/constants";

export const wsInit = createAction("orderFeed/WS_CONNECTION_START", (url: string) => {
    return {
        payload: {
            url
        }
    }
});

export const wsClose = createAction("orderFeed/WS_CONNECTION_CLOSE");
export const onOpen = createAction("orderFeed/WS_CONNECTION_SUCCESS");
export const onClose = createAction("orderFeed/WS_CONNECTION_CLOSED");
export const onError = createAction("orderFeed/WS_CONNECTION_ERROR");
export const onMessage = createAction("orderFeed/WS_GET_MESSAGE", (orderFeedData: orderFeed) => {
    return {
        payload: {
            orderFeedData
        }
    }
});