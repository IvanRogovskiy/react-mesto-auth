import {baseUrl} from "./constants";
import {headers} from "./constants";

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getMyProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers:this._headers
        })
            .then(res => {
                return this._checkResponse(res, 'Ошибка получения данных профиля')}
            )
    }

    getUsersCards() {
        return fetch(`${this._baseUrl}/cards `, {
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res, 'Ошибка получения карточек')}
            )
    }

    updateUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => {
                return this._checkResponse(res, 'Ошибка при обновлении данных юзера') }
            )
    }

    addNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => {
                return this._checkResponse(res, `Ошибка ${res.status} при создании карточки`)
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => {
                return this._checkResponse(res, `Ошибка ${res.status} при удалении карточки с id ${cardId}`)
            })
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => {
                return this._checkResponse(res, `Ошибка ${res.status} при лайке карточки с id ${cardId}`)
            })
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => {
                return this._checkResponse(res, `Ошибка ${res.status} при удалении лайка карточки с id ${cardId}`)
            })
    }

    updateUserAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
            .then(res => {
                return this._checkResponse(res, `Ошибка ${res.status} при обновлении аватара пользователя`)
            })
    }

    _checkResponse(res, msg) {
        if (res.ok) { return res.json() }
        return Promise.reject(msg)
    }
}

const api = new Api({baseUrl, headers});
export default api