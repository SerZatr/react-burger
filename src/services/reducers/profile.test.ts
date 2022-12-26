import { loginError, loginRequest, loginSuccess } from "../actions/login";
import { logoutRequest, logoutSuccess, logoutError } from "../actions/logout";
import {
    profileGetRequest,
    profileGetSuccess,
    profileGetError,
} from "../actions/profile-get";
import {
    profileUpdateError,
    profileUpdateRequest,
    profileUpdateSuccess,
} from "../actions/profile-update";
import {
    registerRequest,
    registerSuccess,
    registerError,
} from "../actions/register";
import { profile as reducer, initialState } from "./profile";

const testUser = {
    email: "some@some.ru",
    name: "userName",
};

const errorObject = {
    ...initialState,
    error: true
}

const requestObject = {
    ...initialState,
    request: true
}

const userObject = {
    ...initialState,
    user: testUser
}

const userAndTokensObject = {
    ...initialState,
    user: testUser,
    accessToken: "access",
    refreshToken: "refresh",
}

describe("profile reducer", () => {

  it("should return the initial state", () => {
      expect(
          reducer(undefined, {
              type: undefined,
          })
      ).toEqual(initialState);
  });



    it("Should successfully handle profileGetRequest", async () => {
        const result = reducer(undefined, { type: profileGetRequest });
        expect(result).toEqual(requestObject);
    });

    it("Should successfully handle profileGetSuccess", async () => {
        const result = reducer(undefined, {
            type: profileGetSuccess,
            payload: {
                user: testUser,
            },
        });
        expect(result).toEqual(userObject);
    });

    it("Should handle profileGetError", async () => {
        const result = reducer(undefined, {
            type: profileGetError,
        });
        expect(result).toEqual(errorObject);
    });

    it("Should handle profileUpdateRequest", async () => {
        const result = reducer(undefined, {
            type: profileUpdateRequest,
        });
        expect(result).toEqual(requestObject);
    });

    it("Should handle profileUpdateSuccess", async () => {
        const result = reducer(undefined, {
            type: profileUpdateSuccess,
            payload: {
                user: testUser,
            },
        });
        expect(result).toEqual(userObject);
    });

    it("Should handle profileUpdateError", async () => {
        const result = reducer(undefined, {
            type: profileUpdateError,
        });
        expect(result).toEqual(errorObject);
    });

    it("Should handle loginRequest", async () => {
        const result = reducer(undefined, {
            type: loginRequest,
        });
        expect(result).toEqual(requestObject);
    });

    it("Should handle loginSuccess", async () => {
        const result = reducer(undefined, {
            type: loginSuccess,
            payload: {
                user: testUser,
                accessToken: "access",
                refreshToken: "refresh",
            },
        });
        expect(result).toEqual(userAndTokensObject);
    });

    it("Should handle loginError", async () => {
        const result = reducer(undefined, {
            type: loginError,
        });
        expect(result).toEqual(errorObject);
    });

    it("Should handle logoutRequest", async () => {
        const result = reducer(undefined, {
            type: logoutRequest,
        });
        expect(result).toEqual(requestObject);
    });

    it("Should handle logoutSuccess", async () => {
        const result = reducer(undefined, {
            type: logoutSuccess,
        });
        expect(result).toEqual(initialState);
    });

    it("Should handle logoutError", async () => {
        const result = reducer(undefined, {
            type: logoutError,
        });
        expect(result).toEqual(errorObject);
    });

    it("Should handle registerRequest", async () => {
        const result = reducer(undefined, {
            type: registerRequest,
        });
        expect(result).toEqual(requestObject);
    });

    it("Should handle registerSuccess", async () => {
        const result = reducer(undefined, {
            type: registerSuccess,
            payload: {
                user: testUser,
                accessToken: "access",
                refreshToken: "refresh",
            },
        });
        expect(result).toEqual(userAndTokensObject);
    });

    it("Should handle registerError", async () => {
        const result = reducer(undefined, {
            type: registerError,
            payload: {
                user: testUser,
                accessToken: "access",
                refreshToken: "refresh",
            },
        });
        expect(result).toEqual(errorObject);
    });
});
