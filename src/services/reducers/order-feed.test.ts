import {
  onOpen,
  onClose,
  wsClose,
  wsInit,
  onError,
  onMessage,
} from "../actions/order-feed";
import { orderFeedReducer as reducer } from "./order-feed";

describe("order-feed reducer", () => {

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual({ 
        data: {},
        wsConnected: false,
        error: false,
      });
  });

  it("Should successfully handle onOpen", async () => {
      const result = reducer(undefined, { type: onOpen });
      expect(result).toEqual({
          wsConnected: true,
          error: false,
          data: {},
      });
  });

  it("Should successfully handle onClose", async () => {
      const result = reducer(undefined, { type: onClose });
      expect(result).toEqual({
          wsConnected: false,
          error: false,
          data: {},
      });
  });

  it("Should successfully handle wsClose", async () => {
      const result = reducer(undefined, { type: wsClose });
      expect(result).toEqual({
          wsConnected: false,
          error: false,
          data: {},
      });
  });

  it("Should successfully handle wsInit", async () => {
      const result = reducer(undefined, { type: wsInit });
      expect(result).toEqual({
          wsConnected: false,
          error: false,
          data: {},
      });
  });

  it("Should successfully handle onError", async () => {
      const result = reducer(undefined, { type: onError });
      expect(result).toEqual({
          wsConnected: false,
          error: true,
          data: {},
      });
  });

  it("Should successfully handle onMessage", async () => {
      const testData = {
          orders: [
              {
                  name: "someName",
                  ingredients: ["63b386dd-72b6-4b49-9cd4-fc1dd53fe383"],
                  _id: "c0b399e1-459c-44f9-857e-017512d47801",
                  status: "done",
                  number: 1,
                  createdAt: 1327611110417,
                  updatedAt: 1327611110417,
              },
          ],
          total: 1,
          totalToday: 1,
      };
      const result = reducer(undefined, {
          type: onMessage,
          payload: {
              orderFeedData: testData,
          },
      });
      expect(result).toEqual({
          wsConnected: true,
          error: false,
          data: testData,
      });
  });
});
