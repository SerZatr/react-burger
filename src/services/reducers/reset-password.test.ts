import {
  resetRequest,
  resetSuccess,
  resetError,
} from "../actions/reset-password";
import { resetPassword as reducer } from "./reset-password";

describe("reset-password reducer", () => {

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

  it("Should successfully handle resetRequest", async () => {
      const result = reducer(undefined, { type: resetRequest });
      expect(result).toEqual({
          message: "",
          request: true,
          error: false,
      });
  });

  it("Should successfully handle resetSuccess", async () => {
      const result = reducer(undefined, {
          type: resetSuccess,
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

  it("Should successfully handle resetError", async () => {
      const result = reducer(undefined, { type: resetError });
      expect(result).toEqual({
          message: "",
          request: false,
          error: true,
      });
  });
});
