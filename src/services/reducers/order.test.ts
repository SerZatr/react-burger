import {
  postOrderRequest,
  postOrderSuccess,
  postOrderError,
} from "../actions/order";
import { order as reducer, initialState } from "./order";

describe("order reducer", () => {

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual(initialState);
  });

  it("Should successfully handle postOrderRequest", async () => {
      const result = reducer(undefined, { type: postOrderRequest });
      expect(result).toEqual({
        ...initialState,
        request: true
      });
  });

  it("Should successfully handle postOrderSuccess", async () => {
      const result = reducer(undefined, {
          type: postOrderSuccess,
          payload: {
              orderId: 123,
          },
      });
      expect(result).toEqual({
        ...initialState,
        id: 123
      });
  });

  it("should handle postOrderError", async () => {
      const result = reducer(undefined, {
          type: postOrderError,
      });
      expect(result).toEqual({
        ...initialState,
        error: true
      });
  });
});
