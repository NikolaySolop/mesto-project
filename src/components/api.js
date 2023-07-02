import {profileName, profileSubheading, profileAvatar, profile} from './modal'
import {cardContainer, handleLikesUpdate, handleLikeIcon, showLikes} from "./card";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'ad908c8a-b7d2-4187-8ef9-d7f0b9a09ba4',
        'Content-Type': 'application/json'
    }
}

export const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            profileName.textContent = data.name;
            profileSubheading.textContent = data.about;
            profileAvatar.src = data.avatar;
            profile.setAttribute('data-profile-id', data._id);
            return data
        })
        .catch((err) => {
            console.log(err);
        });
}

export const getCards = (createCard, fragment, cardContainer) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }).then((cards) => {
        getProfileData().then((user) => {
            cards.forEach(card => {
                const cardElement = createCard(card, user._id);
                fragment.append(cardElement);
            })
            cardContainer.append(fragment);
        });

    })
        .catch((err) => {
            console.log(err);
        });
}


export const patchProfileData = (nameInput, subheadingInput, profileName, profileSubheading) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput,
            about: subheadingInput
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }).then((data) => {
        profileName.textContent = (data.name === '') ? profileName.textContent : data.name;
        profileSubheading.textContent = (data.about === '') ? profileSubheading.textContent : data.about;
    })
        .catch((err) => {
            console.log(err);
        });
}


export const postCard = (name, link, createCard, cardContainer) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);

    }).then((data) => {
        getProfileData().then((user) => {
            const card = createCard(data, user._id);
            cardContainer.prepend(card);
        });

    })
        .catch((err) => {
            console.log(err);
        });
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);

    }).then((data) => {
        handleLikesUpdate(data._id, data.likes.length);
        showLikes(null, data);
    })
        .catch((err) => {
            console.log(err);
        });
}

export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);

    }).then((data) => {
        handleLikesUpdate(data._id, data.likes.length);
        showLikes(null, data);
    })
        .catch((err) => {
            console.log(err);
        });
}

export const deleteCard = (cardId, cardElement) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);

    }).then((data) => {
        cardElement.remove();
        return data
    })
        .catch((err) => {
            console.log(err);
        });
}