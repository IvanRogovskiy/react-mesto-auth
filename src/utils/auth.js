const BASE_URL = `https://auth.nomoreparties.co`

// export const checkResponse = ({res, json}) => {
//     if (res.ok) { return json }
//     return Promise.reject(json.error)
//
// }

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
        .then(res => {
            return res.json().then(json => {
                console.log(res, json);
                return {res, json}
            }).catch(err => {
                throw new Error(err)
            })
        })
        .then(({res, json}) => {
            if (res.ok) { return json }
            return Promise.reject(json.error)
            // return checkResponse(({res, json}))
        })
        .catch((err) => {
            throw new Error(err)
        })
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({password, email})
    })
        // .then((res) => {
        //     if(res.ok) {
        //         return res.json()
        //     } else {
        //             return res.status
        //         }
        //     }
        // )
        // .then((data) => {
        //     if((data.code !== 400 && data.code !== 401)) {
        //         localStorage.setItem('jwt', data.token)
        //         return data
        //     }
        // })
        .then(res => {
            return res.json().then(json => {
                console.log(res, json);
                return {res, json}
            }).catch(err => {
                throw new Error(err)
            })
        })
        .then(({res, json}) => {
            if (res.ok) {
                return json
            }
            return Promise.reject(json.message)
        })
        .then((data) => {
            if(data.token) {
                debugger
                localStorage.setItem('jwt', data.token)
            }
            return data
        })
        .catch((err) => {
            throw new Error(err)
        })
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => {
            return res.json().then(json => {
                return {res, json}
            }).catch(err => {
                throw new Error(err)
            })
            .then(({res, json}) => {
                if (res.ok) {
                    return json
                }
                return new Promise.reject(json.error)
            })
            .then(data => data)
            .catch(err => {
                throw new Error(err)
            })
        })

}

