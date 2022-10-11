import React from "react";
import { IIngredient } from "../utils/ingredient-type";

interface IDataContext {
    data?: IIngredient[],
    setData?: Function;
}
export const DataContext = React.createContext<IDataContext>({});