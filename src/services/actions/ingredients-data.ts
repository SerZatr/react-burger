import { AnyAction, createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../..";
import { BASE_URL, IIngredient } from "../../utils/constants";
import { request } from "../../utils/request";

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
    return async function(dispatch: AppDispatch ) {
        dispatch(getIngredientsRequest());
        const url = BASE_URL + "/ingredients";
        try {
            const response = (await request(url)).data as unknown as IIngredient[] | undefined;
            if (response) {
              dispatch(getIngredientsSuccess(response));
            }
        }
        catch (error) {
            dispatch(getIngredientsError());
        }
    } as unknown as AnyAction;
};