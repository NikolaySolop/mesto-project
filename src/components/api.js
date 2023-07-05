import {profileFormFullname, profileFormProfession} from './utils'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'ad908c8a-b7d2-4187-8ef9-d7f0b9a09ba4',
        'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkResponse)
        .then(data => data);
}

export const getCards = (createCard, fragment) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
        .then(checkResponse)
        .then(cards => cards);
}


export const patchProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileFormFullname.value,
            about: profileFormProfession.value
        })
    })
        .then(checkResponse)
        .then(data => data);
}

export const patchAvatarPicture = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    })
        .then(checkResponse)
        .then(data => data)
}


export const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(checkResponse)
        .then(data => data);
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkResponse)
        .then(data => data);
}

export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
        .then(data => data);
}

export const deleteCard = (cardId, cardElement) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
        .then(data => data);
}