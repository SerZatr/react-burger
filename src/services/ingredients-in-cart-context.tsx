import React from "react";
import { IIngredientsInCart } from "../components/app/app";

interface IIngredientsInCartContext {
    ingredientsInCart?: IIngredientsInCart,
    setIngredientsInCart?: Function;
}
export const IngredientsInCart = React.createContext<IIngredientsInCartContext>({});