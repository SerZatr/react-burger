import React from "react";

interface IOrderContext {
    order?: number,
    setOrder?: Function;
}
export const OrderContext = React.createContext<IOrderContext>({});