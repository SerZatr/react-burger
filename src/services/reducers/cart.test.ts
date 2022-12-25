import { cart as reducer } from "./cart";
import {
    addIngredient,
    changeIngredientPosition,
    removeIngredient,
    addBun,
    replaceBun,
    setIngredientsFromStorage,
} from "../actions/cart";

describe("cart reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {} as any)).toEqual({
            ingredients: [],
            bun: undefined,
        });
    });

    it("should handle addIngredient", () => {
        const testResult = {
            bun: undefined,
            ingredients: [
                {
                    ingredientId: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
                    uuid: "2c3e835b-76c1-408b-8d0a-48220aa08303",
                },
            ],
        };
        expect(
            reducer(undefined, {
                type: addIngredient,
                payload: {
                    id: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
                    uuid: "2c3e835b-76c1-408b-8d0a-48220aa08303",
                },
            })
        ).toEqual(testResult),
            expect(
                JSON.parse(localStorage.getItem("ingredientsInCart") ?? "")
            ).toEqual(testResult);
    });

    it("should handle removeIngredient", () => {
        const testState = {
            bun: undefined,
            ingredients: [
                {
                    ingredientId: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
                    uuid: "2c3e835b-76c1-408b-8d0a-48220aa08303",
                },
            ],
        };
        const testResult = {
            bun: undefined,
            ingredients: [],
        };
        expect(
            reducer(testState, {
                type: removeIngredient,
                payload: {
                    index: 0,
                },
            })
        ).toEqual(testResult),
            expect(
                JSON.parse(localStorage.getItem("ingredientsInCart") ?? "")
            ).toEqual(testResult);
    });

    it("should handle changeIngredientPosition", () => {
        const testResult = {
            bun: undefined,
            ingredients: [
                {
                    ingredientId: "02423ade-4f26-40ab-8070-3d51c8a21e82",
                    uuid: "e86be693-df60-4b77-a374-76dbd23bc2a6",
                },
                {
                    ingredientId: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
                    uuid: "2c3e835b-76c1-408b-8d0a-48220aa08303",
                },
            ],
        };
        const testState = {
            bun: undefined,
            ingredients: [
                {
                    ingredientId: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
                    uuid: "2c3e835b-76c1-408b-8d0a-48220aa08303",
                },
                {
                    ingredientId: "02423ade-4f26-40ab-8070-3d51c8a21e82",
                    uuid: "e86be693-df60-4b77-a374-76dbd23bc2a6",
                },
            ],
        };
        expect(
            reducer(testState, {
                type: changeIngredientPosition,
                payload: {
                    oldIndex: 1,
                    newIndex: 0,
                },
            })
        ).toEqual(testResult),
            expect(
                JSON.parse(localStorage.getItem("ingredientsInCart") ?? "")
            ).toEqual(testResult);
    });

    it("should handle addBun", () => {
        const testResult = {
            bun: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
            ingredients: [],
        };
        expect(
            reducer(undefined, {
                type: addBun,
                payload: {
                    id: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
                },
            })
        ).toEqual(testResult),
            expect(
                JSON.parse(localStorage.getItem("ingredientsInCart") ?? "")
            ).toEqual(testResult);
    });

    it("should handle replaceBun", () => {
        const testResult = {
            bun: "2c3e835b-76c1-408b-8d0a-48220aa08303",
            ingredients: [],
        };
        const testState = {
            bun: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
            ingredients: [],
        };
        expect(
            reducer(testState, {
                type: replaceBun,
                payload: {
                    id: "2c3e835b-76c1-408b-8d0a-48220aa08303",
                },
            })
        ).toEqual(testResult),
            expect(
                JSON.parse(localStorage.getItem("ingredientsInCart") ?? "")
            ).toEqual(testResult);
    });

    it("should handle setIngredientsFromStorage", () => {
        const testResult = {
            bun: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
            ingredients: [],
        };
        const testData = {
            bun: "fb9990d6-1da4-4344-b98b-09bcda8da24a",
            ingredients: [],
        };
        localStorage.setItem("ingredientsInCart", JSON.stringify(testData));
        expect(
            reducer(undefined, {
                type: setIngredientsFromStorage,
            })
        ).toEqual(testResult),
            expect(
                JSON.parse(localStorage.getItem("ingredientsInCart") ?? "")
            ).toEqual(testResult);
    });
});
