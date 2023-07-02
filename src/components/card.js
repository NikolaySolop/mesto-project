import {openPopup, closePopup} from './utils'
import {deleteCard, dislikeCard, getCards, likeCard} from "./api";

// VARIABLES
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Горы Архыза'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Река, протекающая в горном массиве'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Массив многоэтажек'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Вид с подножья горы'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Железнодорожная одноколейная дорога, проходящая через лесной массив'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Замерзшее озеро Байкал'
    }
];

// ELEMENTS
// ---> cards
const cardContainer = document.querySelector('.card');
const cardTemplate = document.querySelector('#card').content;

// ---> picture popup
const picturePopupWindow = document.querySelector('.popup.popup__type_picture');
const picturePopup = picturePopupWindow.querySelector('.popup__picture');
const pictureHeadingPopup = picturePopupWindow.querySelector('.popup__picture-heading');

// FUNCTIONS
// ---> cards
function showLikes(cardElementProvided, cardInfo) {
    let cardElement = document.querySelector(`[data-id="${cardInfo._id}"]`);
    if (!cardElement) {
        cardElement = cardElementProvided;
    }
    const likesAmountElement = cardElement.querySelector('.card__likes-amount');
    if (cardInfo.likes.length > 0) {
        likesAmountElement.classList.add('card__likes-amount_active_on');
        likesAmountElement.textContent = cardInfo.likes.length;
    } else {
        likesAmountElement.classList.remove('card__likes-amount_active_on');
    }
}

function isLikedByUser(cardElement, cardInfo, userID) {
    const cardHeartElement = cardElement.querySelector('.card__heart');
    if (cardHeartElement) {
        const isLiked = cardInfo.likes.some(user => user._id === userID)
        if (isLiked) {
            cardHeartElement.classList.add('card__heart_on')
        }
    }
}


function showTrashIcon(cardElement, cardInfo, userId) {
    if (cardInfo.owner._id === userId) {
        const trashBinElement = cardElement.querySelector('.card__trash');
        trashBinElement.classList.add('card__trash_active_on');
    }
}

function createCard(cardInfo, userID) {
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardElement.setAttribute('data-id', cardInfo._id);
    cardImage.src = cardInfo.link;
    cardTitle.textContent = cardInfo.name;
    isLikedByUser(cardElement, cardInfo, userID);
    showLikes(cardElement, cardInfo);
    showTrashIcon(cardElement, cardInfo, userID);
    return cardElement
}

function cardIdSearch(evt) {
    const cardElement = evt.target.closest('.card__item');
    return cardElement.dataset.id;
}


// HANDLERS
// ---> cards
function handleCreateCardList() {
    const fragment = document.createDocumentFragment();
    getCards(createCard, fragment, cardContainer);
}

function handleLikesUpdate(cardId, likesNumber) {
    const cardElement = document.querySelector(`[data-id="${cardId}"]`);
    const likesAmount = cardElement.querySelector('.card__likes-amount');
    likesAmount.textContent = likesNumber;
}

function handleLikeIcon(evt) {
    if (evt.target.classList.contains('card__heart_on')) {
        const cardId = cardIdSearch(evt);
        evt.target.classList.toggle('card__heart_on');
        return dislikeCard(cardId);
    }
    if (evt.target.classList.contains('card__heart')) {
        const cardId = cardIdSearch(evt);
        evt.target.classList.toggle('card__heart_on');
        return likeCard(cardId);
    }
}

function handleDeleteCard(evt) {
    if (evt.target.classList.contains('card__trash')) {
        const clickedCard = evt.target.closest('.card__item');
        const cardId = clickedCard.dataset.id;
        deleteCard(cardId, clickedCard);
    }
}

function handleOpenCard(evt) {
    if (evt.target.classList.contains('card__image')) {
        const clickedCard = evt.target.closest('.card__item');
        const clickedCardImage = clickedCard.querySelector('.card__image');
        const clickedCardCaption = clickedCard.querySelector('.card__caption');
        openPopup(picturePopupWindow);

        picturePopup.src = clickedCardImage.src;
        picturePopup.alt = clickedCardImage.alt;
        pictureHeadingPopup.textContent = clickedCardCaption.textContent;
    }
}


export {
    handleCreateCardList,
    createCard,
    cardContainer,
    handleLikeIcon,
    handleDeleteCard,
    handleOpenCard,
    handleLikesUpdate,
    showLikes
};