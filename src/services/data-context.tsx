import React from "react";
import { IIngredient } from "../utils/ingredient-type";

interface IIngredientsDataContext {
    ingredientsData?: IIngredient[],
    setIngredientsData?: Function;
}
export const IngredientsDataContext = React.createContext<IIngredientsDataContext>({});