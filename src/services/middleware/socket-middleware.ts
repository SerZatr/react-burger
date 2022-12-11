import { BASE_WS } from "../../utils/constants";
import { onClose, onError, onMessage, onOpen, wsInit } from "../actions/order-feed";

export const socketMiddleware = () => {
    return (store: any) => {
      let socket: WebSocket | null = null;
  
      return (next: (arg0: any) => void) => (action: { type: string; payload: {url: string}; }) => {
        const { dispatch } = store;
        const { type, payload } = action;
        if (type === "orderFeed/WS_CONNECTION_START") {
          console.log("start");
          socket = new WebSocket(`${BASE_WS}${payload.url}`);
        }
        if (type === "orderFeed/WS_CONNECTION_CLOSE") {
          console.log("close");
          socket?.close();
        }
        if (socket) {
          socket.onopen = event => {
            dispatch(onOpen());
          };
  
          socket.onerror = event => {
            dispatch(onError());
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch(onMessage(restParsedData));
          };
  
          socket.onclose = event => {
            dispatch(onClose());
          };
        }
  
        next(action);
      };
    };
  };