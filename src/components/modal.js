import {closePopup, openPopup} from './utils';
import {isValid, toggleButtonState} from './validate';
import {createCard, cardContainer} from './card'
import {validationSelectors} from './index';
import {patchProfileData, postCard, patchAvatarPicture} from './api'

// ELEMENTS
// ---> profile popup
const profilePopupWindow = document.querySelector('.popup.popup__type_profile');
const profileAvatarPopupWindow = document.querySelector('.popup.popup__type_avatar');
const profileFormFullname = document.querySelector("#popup__form-profile-input-name");
const profileFormProfession = document.querySelector("#popup__form-profile-input-profession");
const profileForm = document.forms["profile"];
const profileFormSubmitButton = profileForm.querySelector('.popup__form-save-button');

const profileName = document.querySelector('.profile__name');
const profileSubheading = document.querySelector('.profile__subheading');

const avatarForm = document.forms["avatar"];
const profileAvatarElement = document.querySelector('.profile__avatar');
const profileAvatarLinkField = document.querySelector('#popup__form-avatar-input-url');
const profileAvatarFormSubmitButton = avatarForm.querySelector('.popup__form-save-button');

// ---> place popup
const placeForm = document.forms["place"];
const placePopupWindow = document.querySelector('.popup.popup__type_place');
const placeFormPlaceField = document.querySelector("#popup__form-place-input-name");
const placeFormLinkField = document.querySelector("#popup__form-place-input-url");
const profilePlaceFormSubmitButton = placeForm.querySelector('.popup__form-save-button');

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
// ---> avatar popup
function handleOpenAvatarForm() {
    openPopup(profileAvatarPopupWindow);
}

function handleSubmitAvatarProfileForm(evt) {
    evt.preventDefault();
    const avatarLink = profileAvatarLinkField.value;
    patchAvatarPicture(avatarLink);
    closePopup(evt.target.closest('.popup'));
}

// ---> profile popup
function handleOpenProfileForm() {
    openPopup(profilePopupWindow);
    setDefaultValues();
    validateInputs([profileFormFullname, profileFormProfession], validationSelectors);
}


function handleSubmitProfileForm(evt) {
    evt.preventDefault();

    patchProfileData();
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
    }
    postCard(cardData.name, cardData.link);

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
    handleOpenProfileForm, handleSubmitProfileForm, handleOpenAvatarForm, handleSubmitAvatarProfileForm,
    handleOpenPlaceForm, handleSubmitPlaceForm,
    setCloseEventListenersToCrosses,
    profileName, profileSubheading, profileAvatarElement, profileFormSubmitButton,
    profileFormFullname, profileFormProfession, profileAvatarFormSubmitButton, profilePlaceFormSubmitButton
};



