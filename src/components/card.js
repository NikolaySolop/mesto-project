import {openPopup} from './modal'
import {deleteCard, dislikeCard, likeCard} from "./api";
import {
    cardTemplate,
    picturePopupWindow,
    picturePopup,
    pictureHeadingPopup
} from './utils'

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

function searchCardId(evt) {
    const cardElement = evt.target.closest('.card__item');
    return cardElement.dataset.id;
}


// HANDLERS
// ---> cards
function handleLikesUpdate(cardId, likesNumber) {
    const cardElement = document.querySelector(`[data-id="${cardId}"]`);
    const likesAmount = cardElement.querySelector('.card__likes-amount');
    likesAmount.textContent = likesNumber;
}

function handleLike(cardInfo) {
    handleLikesUpdate(cardInfo._id, cardInfo.likes.length);
    showLikes(null, cardInfo);
}

function handleLikeIcon(evt) {
    if (evt.target.classList.contains('card__heart_on')) {
        const cardId = searchCardId(evt);
        evt.target.classList.toggle('card__heart_on');
        return dislikeCard(cardId)
            .then(data => handleLike(data))
            .catch(err => console.log(err));
    }
    if (evt.target.classList.contains('card__heart')) {
        const cardId = searchCardId(evt);
        evt.target.classList.toggle('card__heart_on');
        return likeCard(cardId)
            .then(data => handleLike(data))
            .catch(err => console.log(err));
        ;
    }
}

function handleDeleteCard(evt) {
    const clickedCard = evt.target.closest('.card__item');
    const cardId = clickedCard.dataset.id;
    deleteCard(cardId)
        .then(() => {clickedCard.remove();})
        .catch(err => console.log(err));
}

function handleOpenCard(evt) {
    const clickedCard = evt.target.closest('.card__item');
    const clickedCardImage = clickedCard.querySelector('.card__image');
    const clickedCardCaption = clickedCard.querySelector('.card__title');
    openPopup(picturePopupWindow);

    picturePopup.src = clickedCardImage.src;
    picturePopup.alt = clickedCardImage.alt;
    pictureHeadingPopup.textContent = clickedCardCaption.textContent;
}


export function createCard(cardInfo, userID) {
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const trashIcon = cardElement.querySelector('.card__trash');
    const heartIcon = cardElement.querySelector('.card__heart');
    cardElement.setAttribute('data-id', cardInfo._id);
    cardImage.src = cardInfo.link;
    cardTitle.textContent = cardInfo.name;
    isLikedByUser(cardElement, cardInfo, userID);
    showLikes(cardElement, cardInfo);
    showTrashIcon(cardElement, cardInfo, userID);
    trashIcon.addEventListener('click', handleDeleteCard)
    cardImage.addEventListener('click', handleOpenCard)
    heartIcon.addEventListener('click', handleLikeIcon)
    return cardElement
}
