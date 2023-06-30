import {openPopup, closePopup} from './utils'

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
function createCard(cardInfo) {
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.alt;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    return cardElement
}

function createCardsArray(cards) {
    const fragment = document.createDocumentFragment();

    cards.forEach(card => {
        const cardElement = createCard(card);
        fragment.append(cardElement);
    })
    return fragment
}


// HANDLERS
// ---> cards
function handleCreateCardList() {
    const cards = createCardsArray(initialCards);
    cardContainer.append(cards);
}

function handleLikeIcon(evt) {
    if (evt.target.classList.contains('card__like')) {
        evt.target.classList.toggle('card__like_on');
    }
}

function handleDeleteCard(evt) {
    if (evt.target.classList.contains('card__trash')) {
        const clickedCard = evt.target.closest('.card__item');
        clickedCard.remove();
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


export {handleCreateCardList, createCard, cardContainer, handleLikeIcon, handleDeleteCard, handleOpenCard};