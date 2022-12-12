import { Middleware } from "redux";
import { TWsActions } from "../..";

export const socketMiddleware = (wsActions: TWsActions, baseUrl: string): Middleware => {
    return (store: any) => {
      let socket: WebSocket | null = null;
  
      return (next) => (action) => {
        const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
        const { dispatch } = store;
        const { type, payload } = action;
        if (type === wsInit.type) {
          socket = new WebSocket(baseUrl + payload.url);
        }
        if (type === wsClose.type) {
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