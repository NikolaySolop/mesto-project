import {
    profileName, profileSubheading, profileAvatarElement, profileFormSubmitButton,
    profileFormFullname, profileFormProfession, profileAvatarFormSubmitButton, profilePlaceFormSubmitButton,
} from './modal'

import {cardContainer, handleLikesUpdate, showLikes, createCard} from "./card";

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
            profileAvatarElement.style.backgroundImage = `url("${data.avatar}")`;
            return data
        })
        .catch((err) => {
            console.log(err);
        });
}

export const getCards = (createCard, fragment) => {
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

    }).catch((err) => {
        console.log(err);
    });
}


export const patchProfileData = () => {
    profileFormSubmitButton.textContent = 'Сохранение...'
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileFormFullname.value,
            about: profileFormProfession.value
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }).then((data) => {
        profileName.textContent = (data.name === '') ? profileName.textContent : data.name;
        profileSubheading.textContent = (data.about === '') ? profileSubheading.textContent : data.about;
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        profileFormSubmitButton.textContent = 'Сохранить';
    });
}

export const patchAvatarPicture = (link) => {
    profileAvatarFormSubmitButton.textContent = 'Сохранение...';
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }).then((data) => {
        profileAvatarElement.style.backgroundImage = `url("${link}")`;
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        profileAvatarFormSubmitButton.textContent = 'Сохранить';
    });
}


export const postCard = (name, link) => {
    profilePlaceFormSubmitButton.textContent = 'Сохранение...';
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

    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        profilePlaceFormSubmitButton.textContent = 'Сохраненить';
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
    }).catch((err) => {
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
    }).catch((err) => {
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
    }).catch((err) => {
        console.log(err);
    });
}