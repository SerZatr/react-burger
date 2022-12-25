import {
  restoreRequest,
  restoreSuccess,
  restoreError,
  restoreClear,
} from "../actions/restore-password";
import { restorePassword as reducer } from "./restore-password";

describe("restore-password reducer", () => {

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual({ 
        message: "",
        request: false,
        error: false,
      });
  });

  it("Should successfully handle restoreRequest", async () => {
      const result = reducer(undefined, { type: restoreRequest });
      expect(result).toEqual({
          message: "",
          request: true,
          error: false,
      });
  });

  it("Should successfully handle restoreSuccess", async () => {
      const result = reducer(undefined, {
          type: restoreSuccess,
          payload: {
              message: "mes",
          },
      });
      expect(result).toEqual({
          message: "mes",
          request: false,
          error: false,
      });
  });

  it("Should successfully handle restoreError", async () => {
      const result = reducer(undefined, { type: restoreError });
      expect(result).toEqual({
          message: "",
          request: false,
          error: true,
      });
  });

  it("Should successfully handle restoreClear", async () => {
      const result = reducer(undefined, { type: restoreClear });
      expect(result).toEqual({
          message: "",
          request: false,
          error: false,
      });
  });
});
