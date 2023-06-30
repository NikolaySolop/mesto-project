import {closePopup, openPopup} from './utils';
import {isValid, toggleButtonState} from './validate';
import {createCard, cardContainer} from './card'

import {validationSelectors} from './index';

// ELEMENTS
// ---> profile popup
const profilePopupWindow = document.querySelector('.popup.popup__type_profile');
const profileFormFullname = document.querySelector("#popup__form-profile-input-name");
const profileFormProfession = document.querySelector("#popup__form-profile-input-profession");

const profileForm = document.forms["profile"];
const profileName = document.querySelector('.profile__name');
const profileSubheading = document.querySelector('.profile__subheading');

// ---> place popup
const placeForm = document.forms["place"];
const placePopupWindow = document.querySelector('.popup.popup__type_place');
const placeFormPlaceField = document.querySelector("#popup__form-place-input-name");
const placeFormLinkField = document.querySelector("#popup__form-place-input-url");

// ---> popups
const closeButtons = document.querySelectorAll('.popup__close-button');

// FUNCTIONS
// ---> generic
function setDefaultValues() {
    profileFormFullname.value = profileName.textContent;
    profileFormProfession.value = profileSubheading.textContent;
}

function validateInputs(inputList, selectorsAndClasses) {
    inputList.forEach((inputElement) => {
        const buttonElement = inputElement.closest(selectorsAndClasses.formSelector).querySelector(selectorsAndClasses.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, selectorsAndClasses.inactiveButtonClass);
        isValid(profileForm, inputElement, selectorsAndClasses.inputErrorClass, selectorsAndClasses.errorClass);
    })
}


// HANDLERS
// ---> profile popup
function handleOpenProfileForm() {
    openPopup(profilePopupWindow);
    setDefaultValues();
    validateInputs([profileFormFullname, profileFormProfession], validationSelectors)
}


function handleSubmitProfileForm(evt) {
    evt.preventDefault();

    const nameInput = profileFormFullname.value;
    const subheadingInput = profileFormProfession.value;

    profileName.textContent = (nameInput === '') ? profileName.textContent : nameInput;
    profileSubheading.textContent = (subheadingInput === '') ? profileSubheading.textContent : subheadingInput;

    closePopup(evt.target.closest('.popup'));
}

// ---> place popup
function handleOpenPlaceForm() {
    openPopup(placePopupWindow);
}

function handleSubmitPlaceForm(evt) {
    evt.preventDefault();
    const popup = evt.target.closest('.popup');

    const cardData = {
        name: placeFormPlaceField.value,
        link: placeFormLinkField.value,
        alt: placeFormPlaceField.value
    }

    const card = createCard(cardData);
    cardContainer.prepend(card);

    closePopup(popup);
    placeForm.reset()
}

// ---> all popups
function setCloseEventListenersToCrosses() {
    closeButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    });
}

export {
    handleOpenProfileForm, handleSubmitProfileForm,
    handleOpenPlaceForm, handleSubmitPlaceForm,
    setCloseEventListenersToCrosses
};



