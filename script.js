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
const profileForm = document.querySelector('.form-profile');
const profileName = document.querySelector('.profile__name');
const profileSubheading = document.querySelector('.profile__subheading');

// ---> place popup
const placeEditButton = document.querySelector('.profile__add-button');
const placeCloseButton = document.querySelector('.popup__close-button.popup__type_place');
const placePopupWindow = document.querySelector('.popup.popup__type_place');
const placeFormInputFields = document.querySelectorAll('.form-place__item');
const placeForm = document.querySelector('.form-place');


// ---> cards
const cardContainer = document.querySelector('.card');
const cardTemplate = document.querySelector('#card').content;




// FUNCTIONS
function togglePopupDisplay(element) {
    element.classList.toggle('popup_opened');
}

function clearInputFields(fields) {
    fields.forEach(field => {
        field.value = '';
    });
}

function setPlaceholderValues(formFields, placeholderValues) {
    formFields.forEach((field, index) => {
        field.placeholder = placeholderValues[index].textContent;
    });
}

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
// ---> profile popup
function handleOpenProfileForm() {
    togglePopupDisplay(profilePopupWindow);
    setPlaceholderValues(profileFormInputFields, [profileName, profileSubheading]);
}

function handleCloseProfileForm() {
    togglePopupDisplay(profilePopupWindow);
    clearInputFields(profileFormInputFields);
}

function handleSubmitProfileForm(evt) {
    evt.preventDefault();

    const nameInput = profileFormInputFields[0].value;
    const subheadingInput = profileFormInputFields[1].value;

    profileName.textContent = (nameInput === '') ? profileName.textContent : nameInput;
    profileSubheading.textContent = (subheadingInput === '') ? profileSubheading.textContent : subheadingInput;

    handleCloseProfileForm();
}

// ---> place popup
function handleOpenPlaceForm() {
    togglePopupDisplay(placePopupWindow);
}

function handleClosePlaceForm() {
    togglePopupDisplay(placePopupWindow);
    clearInputFields(placeFormInputFields);
}

function handleSubmitPlaceForm(evt) {
    evt.preventDefault();
    
    const cardData = {
        name: placeFormInputFields[0].value,
        link: placeFormInputFields[1].value,
        alt: placeFormInputFields[0].value
    }
    
    const card = createCard(cardData);
    cardContainer.prepend(card);

    handleClosePlaceForm();
}

// ---> cards
function handleCreateCardList(){
    const cards = createCardsArray(initialCards);
    cardContainer.append(cards);
}

// EVENT LISTENERS
// ---> profile
profileEditButton.addEventListener('click', handleOpenProfileForm);
profileCloseButton.addEventListener('click', handleCloseProfileForm);
profileForm.addEventListener('submit', handleSubmitProfileForm);

// ---> places
placeEditButton.addEventListener('click', handleOpenPlaceForm);
placeCloseButton.addEventListener('click', handleClosePlaceForm);
placeForm.addEventListener('submit', handleSubmitPlaceForm)

// EVENTS AFTER PAGE LOADING
handleCreateCardList();