// ELEMENTS
// ---> profile popup
export const profileForm = document.forms["profile"];
export const profileFormFullname = document.querySelector("#popup__form-profile-input-name");
export const profileFormProfession = document.querySelector("#popup__form-profile-input-profession");
export const profileFormSubmitButton = profileForm.querySelector('.popup__form-save-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profilePopupWindow = document.querySelector('.popup.popup__type_profile');
export const profileName = document.querySelector('.profile__name');
export const profileSubheading = document.querySelector('.profile__subheading');

// ---> avatar
export const avatarForm = document.forms["avatar"];
export const profileAvatarFormSubmitButton = avatarForm.querySelector('.popup__form-save-button');
export const profileAvatarElement = document.querySelector('.profile__avatar');
export const profileAvatarButton = document.querySelector('.profile__pencil');
export const profileAvatarForm = document.querySelector('.popup__type_avatar');
export const profileAvatarPopupWindow = document.querySelector('.popup.popup__type_avatar');
export const profileAvatarLinkField = document.querySelector('#popup__form-avatar-input-url');

// ---> place popup
export const placeForm = document.forms["place"];
export const placeProfileFormSubmitButton = placeForm.querySelector('.popup__form-save-button');
export const placeEditButton = document.querySelector('.profile__add-button');
export const placeFormPlaceField = document.querySelector("#popup__form-place-input-name");
export const placeFormLinkField = document.querySelector("#popup__form-place-input-url");
export const placePopupWindow = document.querySelector('.popup.popup__type_place');

// ---> card
export const cardContainer = document.querySelector('.card');
export const cardTemplate = document.querySelector('#card').content;

// ---> picture
export const picturePopupWindow = document.querySelector('.popup.popup__type_picture');
export const picturePopup = picturePopupWindow.querySelector('.popup__picture');
export const pictureHeadingPopup = picturePopupWindow.querySelector('.popup__picture-heading');

// ---> general
export const closeButtons = document.querySelectorAll('.popup__close-button');

//VARIABLES
export const validationSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save-button',
    inactiveButtonClass: 'popup__form-save-button_inactive',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-span-error_active'
}

