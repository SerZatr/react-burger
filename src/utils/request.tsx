import { getProfile } from "../services/actions/profile-get";
import { BASE_URL } from "./constants";

export async function request(url: string, options?: RequestInit) {
    let response = await fetch(url, options)
        .then(checkResponse);
    if (response === "token updatet") {
        response = request(url, options);
    }
    return response;
  };

async function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    } else {
        res.json().then( data => {
            if ( data.message === "jwt expired") {
                return getAccessToken();
        }}).catch(e => {
            return Promise.reject(e);
        });
    }
    const error = `Ошибка ${res.status}`;
    return Promise.reject(error);
};

async function getAccessToken() {
    try {
        const token = localStorage.getItem("refreshToken");
        if (token) {
            const url = BASE_URL + "/auth/token";
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token})
            };
            const tokenResponse = await request(url, options);
            if (tokenResponse.success) {
                localStorage.setItem("accessToken", tokenResponse.accessToken);
                localStorage.setItem("refreshToken", tokenResponse.refreshToken);
                getProfile();
                return Promise.resolve("token updatet");
            } else {
                const error = `Ошибка ${tokenResponse.status}`;
                return Promise.reject(error);
            }
        } else {
            const error = "Отсутствует refreshToken";
            return Promise.reject(error);
        }
    }
    catch(e) {
        console.log(e)
    }
}