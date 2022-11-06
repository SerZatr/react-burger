import { BASE_URL } from "./constants";

export async function request(url: string, options?: RequestInit) {
    let response = await fetch(url, options).then(checkResponse);
    if (response.message === "jwt expired") {
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
                    response = await fetch(url, options).then(checkResponse);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return response;
  };

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    const error = `Ошибка ${res.status}`;
    return Promise.reject(error);
};