import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsError,
} from "../actions/ingredients-data";
import { ingredientsData as reducer } from "./ingredients-data";

describe("ingredients-data reducer", () => {
  const testIngredient = {
      calories: 643,
      carbohydrates: 85,
      fat: 26,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      name: "Флюоресцентная булка R2-D3",
      price: 988,
      proteins: 44,
      type: "bun",
      __v: 0,
      _id: "60d3b41abdacab0026a733c7",
  };

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual({ 
        data: [],
        request: false,
        error: false,
      });
  });

  it("Should successfully handle getIngredientsRequest", async () => {
      const result = reducer(undefined, { type: getIngredientsRequest });
      expect(result).toEqual({
          data: [],
          request: true,
          error: false,
      });
  });

  it("Should successfully handle getIngredientsSuccess", async () => {
      const result = reducer(undefined, {
          type: getIngredientsSuccess,
          payload: {
              ingredientsData: [testIngredient],
          },
      });
      expect(result).toEqual({
          data: [testIngredient],
          request: false,
          error: false,
      });
  });

  it("Should handle getIngredientsError", async () => {
      const result = reducer(undefined, {
          type: getIngredientsError,
      });
      expect(result).toEqual({
          data: [],
          request: false,
          error: true,
      });
  });
});
