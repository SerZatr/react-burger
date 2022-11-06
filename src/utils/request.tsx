export async function request(url: string, options?: RequestInit) {
    return await fetch(url, options).then(checkResponse)
  };

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    const error = `Ошибка ${res.status}`;
    console.log(`${error}`);
    return Promise.reject(error);
};