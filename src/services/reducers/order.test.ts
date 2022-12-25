import {
  postOrderRequest,
  postOrderSuccess,
  postOrderError,
} from "../actions/order";
import { order as reducer } from "./order";

describe("order reducer", () => {

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual({ 
        id: undefined,
        request: false,
        error: false,
      });
  });

  it("Should successfully handle postOrderRequest", async () => {
      const result = reducer(undefined, { type: postOrderRequest });
      expect(result).toEqual({
          id: undefined,
          request: true,
          error: false,
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
          id: 123,
          request: false,
          error: false,
      });
  });

  it("should handle postOrderError", async () => {
      const result = reducer(undefined, {
          type: postOrderError,
      });
      expect(result).toEqual({
          id: undefined,
          request: false,
          error: true,
      });
  });
});
