import { AnyAction, createAction, Dispatch } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/ingredient-type";


export const getIngredientsRequest = createAction("ingredientsData/request");
export const getIngredientsError = createAction("ingredientsData/error");
export const getIngredientsSuccess = createAction("ingredientsData/success", (ingredientsData: IIngredient[]) => {
    return {
        payload: {
            ingredientsData
        }
    }
});

export function getIngredients() {
    return async function(dispatch: Dispatch) {
        dispatch(getIngredientsRequest());
        const url = "https://norma.nomoreparties.space/api/ingredients "
        try {
            const response = await fetch(url);
            if(response.ok) {
              const json = await response.json();
              const ingredientsData: IIngredient[] = json.data as IIngredient[];
              dispatch(getIngredientsSuccess(ingredientsData));
            } else {
              throw new Error("Не удаось загрузить данные. Попробуйте открыть страницу позже.");
            }
          }
        catch (error) {
            dispatch(getIngredientsError());
            console.log(`${error}`);
        }
    } as unknown as AnyAction
};