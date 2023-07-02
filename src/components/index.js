import '../pages/index.css';

import {
    handleOpenProfileForm,
    handleSubmitProfileForm,
    handleOpenPlaceForm,
    handleSubmitPlaceForm,
    setCloseEventListenersToCrosses
} from './modal'

import {handleCreateCardList, handleLikeIcon, handleDeleteCard, handleOpenCard} from './card'
import {enableValidation} from './validate'
import {getProfileData} from './api'

// VARIABLES
const validationSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save-button',
    inactiveButtonClass: 'popup__form-save-button_inactive',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-span-error_active'
}

// ELEMENTS
// ---> profile popup
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup__form_type_profile');

// ---> place popup
const placeEditButton = document.querySelector('.profile__add-button');
const placeForm = document.querySelector('.popup__form_type_place');

// ---> gallery
const gallery = document.querySelector('.gallery');


// EVENTS AFTER PAGE LOADING
handleCreateCardList();

// EVENT LISTENERS
//modal popups
enableValidation(validationSelectors);
setCloseEventListenersToCrosses();

// ---> profile
profileEditButton.addEventListener('click', handleOpenProfileForm);
profileForm.addEventListener('submit', handleSubmitProfileForm);
getProfileData();

// ---> places
placeEditButton.addEventListener('click', handleOpenPlaceForm);
placeForm.addEventListener('submit', handleSubmitPlaceForm);

// ---> gallery
gallery.addEventListener('click', handleLikeIcon);
gallery.addEventListener('click', handleDeleteCard);
gallery.addEventListener('click', handleOpenCard);

//EXPORTING
export {validationSelectors}