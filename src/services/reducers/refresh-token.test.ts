import {
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenError,
} from "../actions/refresh-token";
import { refreshToken as reducer } from "./refresh-token";

describe("refresh-token.test reducer", () => {

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual({ 
        accessToken: "",
        refreshTokenToken: "",
        request: false,
        error: false,
      });
  });

  it("Should successfully handle refreshTokenRequest", async () => {
      const result = reducer(undefined, { type: refreshTokenRequest });
      expect(result).toEqual({
          accessToken: "",
          refreshTokenToken: "",
          request: true,
          error: false,
      });
  });

  it("Should successfully handle refreshTokenSuccess", async () => {
      const result = reducer(undefined, {
          type: refreshTokenSuccess,
          payload: {
              accessToken: "access",
              refreshToken: "refresh",
          },
      });
      expect(result).toEqual({
          accessToken: "access",
          refreshTokenToken: "refresh",
          request: false,
          error: false,
      });
  });

  it("Should successfully handle refreshTokenError", async () => {
      const result = reducer(undefined, { type: refreshTokenError });
      expect(result).toEqual({
          accessToken: "",
          refreshTokenToken: "",
          request: false,
          error: true,
      });
  });
});
