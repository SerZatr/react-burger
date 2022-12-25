import {
  singleFeedOrderRequest,
  singleFeedOrderSuccess,
  singleFeedOrderError,
} from "../actions/single-feed-order";
import { singleFeedOrder as reducer } from "./single-feed-order";

describe("single-feed-order reducer", () => {
  const testOrderFeedData = {
      name: "someName",
      ingredients: ["44246fca-cc2e-4391-b018-b31f76a3e2e2"],
      _id: "93825233-8430-44d6-89df-f3ada75d2728",
      status: "done",
      number: "22",
      createdAt: new Date(1671958778797),
      updatedAt: new Date(1671969231531),
  };

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual({ 
        data: undefined,
        request: false,
        error: false,
      });
  });

  it("Should successfully handle singleFeedOrderRequest", async () => {
      const result = reducer(undefined, { type: singleFeedOrderRequest });
      expect(result).toEqual({
          data: undefined,
          request: true,
          error: false,
      });
  });

  it("Should successfully handle singleFeedOrderSuccess", async () => {
      const result = reducer(undefined, {
          type: singleFeedOrderSuccess,
          payload: {
              data: testOrderFeedData,
          },
      });
      expect(result).toEqual({
          data: testOrderFeedData,
          request: false,
          error: false,
      });
  });

  it("Should successfully handle singleFeedOrderError", async () => {
      const result = reducer(undefined, { type: singleFeedOrderError });
      expect(result).toEqual({
          data: undefined,
          request: false,
          error: true,
      });
  });
});
