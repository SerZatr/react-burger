import {
    clearIngredientDetails,
    setIngredientDetails,
} from "../actions/ingredient-details";
import { ingredientDetails as reducer, initialState } from "./ingredient-details";

describe("ingredient-details reducer", () => {
    it("should return the initial state", () => {
        expect(
            reducer(undefined, {
                type: undefined,
            })
        ).toEqual(initialState);
    });

    it("should handle setIngredientDetails", () => {
        const testData = {
            ingredient: {
                calories: 643,
                carbohydrates: 85,
                fat: 26,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_large:
                    "https://code.s3.yandex.net/react/code/bun-01-large.png",
                image_mobile:
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                name: "Флюоресцентная булка R2-D3",
                price: 988,
                proteins: 44,
                type: "bun",
                __v: 0,
                _id: "60d3b41abdacab0026a733c7",
            },
        };
        expect(
            reducer(undefined, {
                type: setIngredientDetails,
                payload: testData,
            })
        ).toEqual(testData);
    });

    it("should handle clearIngredientDetails", () => {
        const testData = {
            ingredient: {
                calories: 643,
                carbohydrates: 85,
                fat: 26,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_large:
                    "https://code.s3.yandex.net/react/code/bun-01-large.png",
                image_mobile:
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                name: "Флюоресцентная булка R2-D3",
                price: 988,
                proteins: 44,
                type: "bun",
                __v: 0,
                _id: "60d3b41abdacab0026a733c7",
            },
        };
        expect(
            reducer(testData, {
                type: clearIngredientDetails,
                payload: testData,
            })
        ).toEqual(initialState);
    });
});
