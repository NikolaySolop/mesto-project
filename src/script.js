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
// ---> profile popup
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button.popup__type_profile');
const profilePopupWindow = document.querySelector('.popup.popup__type_profile');
const profileFormInputFields = document.querySelectorAll('.form-profile__item');
const profileFormFullname = document.querySelector("input[name='fullname'][class='form-profile__item']");
const profileFormProfession = document.querySelector("input[name='profession'][class='form-profile__item']");

const profileForm = document.querySelector('.form-profile');
const profileName = document.querySelector('.profile__name');
const profileSubheading = document.querySelector('.profile__subheading');

// ---> place popup
const placeEditButton = document.querySelector('.profile__add-button');
const placeCloseButton = document.querySelector('.popup__close-button.popup__type_place');
const placePopupWindow = document.querySelector('.popup.popup__type_place');
const placeFormPlaceField = document.querySelector("input[name='place'][class='form-place__item']");
const placeFormLinkField = document.querySelector("input[name='link'][class='form-place__item']");
const placeForm = document.querySelector('.form-place');

// ---> cards
const cardContainer = document.querySelector('.card');
const cardTemplate = document.querySelector('#card').content;

// ---> picture popup
const picturePopupWindow = document.querySelector('.popup.popup__type_picture');
const picturePopupCloseButton = document.querySelector('.popup__close-button.popup__type_picture');
const picturePopup = picturePopupWindow.querySelector('.popup__picture');
const pictureHeadingPopup = picturePopupWindow.querySelector('.popup__picture-heading');

// FUNCTIONS
// ---> generic
function setDefaultValues(){
    profileFormFullname.value = profileName.textContent;
    profileFormProfession.value = profileSubheading.textContent;
}

function openPopup(element) {
    element.classList.add('popup_opened');
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}


// ---> cards
function createCard(cardInfo) {
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.alt;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.querySelector('.card__trash').addEventListener('click', handleDeleteCard);
    cardElement.querySelector('.card__like').addEventListener('click', handleLikeIcon);
    cardElement.querySelector('.card__image').addEventListener('click', handleOpenCard);
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

function toggleLike(element) {
    element.classList.toggle('card__like_on');
}


// HANDLERS
// ---> profile popup
function handleOpenProfileForm() {
    openPopup(profilePopupWindow);
    setDefaultValues();
}

function handleCloseProfileForm() {
    closePopup(profilePopupWindow);
    profileForm.reset()
}

function handleSubmitProfileForm(evt) {
    evt.preventDefault();

    const nameInput = profileFormFullname.value;
    const subheadingInput = profileFormProfession.value;

    profileName.textContent = (nameInput === '') ? profileName.textContent : nameInput;
    profileSubheading.textContent = (subheadingInput === '') ? profileSubheading.textContent : subheadingInput;

    handleCloseProfileForm();
}

// ---> place popup
function handleOpenPlaceForm() {
    openPopup(placePopupWindow);
}

function handleClosePlaceForm() {
    closePopup(placePopupWindow);
    placeForm.reset();
}

function handleSubmitPlaceForm(evt) {
    evt.preventDefault();

    const cardData = {
        name: placeFormPlaceField.value,
        link: placeFormLinkField.value,
        alt: placeFormPlaceField.value
    }

    const card = createCard(cardData);
    cardContainer.prepend(card);

    handleClosePlaceForm();
}

// ---> cards
function handleCreateCardList() {
    const cards = createCardsArray(initialCards);
    cardContainer.append(cards);
}

function handleLikeIcon(evt) {
    const clickedButton = evt.target;
    toggleLike(clickedButton);
}

function handleDeleteCard(evt) {
    const clickedCard = evt.target.closest('.card__item');
    clickedCard.remove();
}

function handleOpenCard(evt) {
    const clickedCard = evt.target.closest('.card__item');
    const clickedCardImage = clickedCard.querySelector('.card__image');
    const clickedCardCaption = clickedCard.querySelector('.card__caption');
    openPopup(picturePopupWindow);

    picturePopup.src = clickedCardImage.src;
    picturePopup.alt = clickedCardImage.alt;
    pictureHeadingPopup.textContent = clickedCardCaption.textContent;
}

function handleCloseCard() {
    closePopup(picturePopupWindow);
}

// EVENTS AFTER PAGE LOADING
handleCreateCardList();

// EVENT LISTENERS
// ---> profile
profileEditButton.addEventListener('click', handleOpenProfileForm);
profileCloseButton.addEventListener('click', handleCloseProfileForm);
profileForm.addEventListener('submit', handleSubmitProfileForm);

// ---> places
placeEditButton.addEventListener('click', handleOpenPlaceForm);
placeCloseButton.addEventListener('click', handleClosePlaceForm);
placeForm.addEventListener('submit', handleSubmitPlaceForm)

// --> cards
picturePopupCloseButton.addEventListener('click', handleCloseCard);

document.addEventListener('keydown', function (event) {
    const openedPicturePopup = document.querySelector('.popup.popup__type_picture.popup_opened');
    const openedPlacePopup = document.querySelector('.popup.popup__type_place.popup_opened');
    const openedProfilePopup = document.querySelector('.popup.popup__type_profile.popup_opened');
    console.log(openedPicturePopup);
    if (event.key === 'Escape' && openedPicturePopup !== null) {
        handleCloseCard()
    }
    if (event.key === 'Escape' && openedPlacePopup !== null) {
        handleClosePlaceForm()
    }
    if (event.key === 'Escape' && openedProfilePopup !== null) {
        handleCloseProfileForm()
    }
});