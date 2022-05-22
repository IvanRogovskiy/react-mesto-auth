const BASE_URL = `https://auth.nomoreparties.co`

export const register = (email, password) => {
    const body1 = JSON.stringify({password, email})
    console.log(body1);
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({password, email})
    })
        .then((response) => {
            return response.json()}
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}