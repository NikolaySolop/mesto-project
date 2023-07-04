import '../pages/index.css';
import {createCard} from './card'
import {enableValidation, validateInputs} from './validate'
import {getCards, getProfileData, patchAvatarPicture, patchProfileData, postCard} from './api'
import {closePopup, openPopup, setCloseEventListenersToCrosses} from "./modal";

import {
    profileName,
    profileSubheading,
    profileAvatarElement,
    profileAvatarFormSubmitButton,
    profileFormSubmitButton,
    placeProfileFormSubmitButton,
    profileFormFullname,
    profileFormProfession,
    profileEditButton,
    profileForm,
    profilePopupWindow,
    profileAvatarButton,
    profileAvatarForm,
    profileAvatarPopupWindow,
    placeEditButton,
    placeForm,
    placeFormPlaceField,
    placeFormLinkField,
    placePopupWindow,
    validationSelectors,
    profileAvatarLinkField,
    cardContainer,
} from './utils'

let userId = null;

// FUNCTIONS
function updateProfileInfo(data) {
    profileName.textContent = data.name;
    profileSubheading.textContent = data.about;
    profileAvatarElement.style.backgroundImage = `url("${data.avatar}")`;
}

function createCards(cards) {
    const fragment = document.createDocumentFragment();
    cards.forEach(card => {
        const cardElement = createCard(card, userId);
        fragment.append(cardElement);
    })
    cardContainer.append(fragment);
}

function setDefaultValues() {
    profileFormFullname.value = profileName.textContent;
    profileFormProfession.value = profileSubheading.textContent;
}


// HANDLERS
function handleOpenAvatarForm() {
    openPopup(profileAvatarPopupWindow);
}

function handleOpenProfileForm() {
    openPopup(profilePopupWindow);
    setDefaultValues();
    validateInputs([profileFormFullname, profileFormProfession], validationSelectors);
}

function handleOpenPlaceForm() {
    openPopup(placePopupWindow);
}

function renderPageAtInit() {
    const profile = getProfileData()
    const cards = getCards()
    Promise.all([profile, cards])
        .then(results => {
            const [profileData, cardsData] = results;
            userId = profileData._id;
            updateProfileInfo(profileData);
            createCards(cardsData);
        })
        .catch(err => console.log(err))
}

function handleSubmitProfileForm(evt) {
    evt.preventDefault();
    profileFormSubmitButton.textContent = 'Сохранение...';
    patchProfileData()
        .then(data => {
            profileName.textContent = (data.name === '') ? profileName.textContent : data.name;
            profileSubheading.textContent = (data.about === '') ? profileSubheading.textContent : data.about;
            closePopup(evt.target.closest('.popup'));
        })
        .catch(err => console.log(err))
        .finally(() => {
            profileFormSubmitButton.textContent = 'Сохранить';
        })
}

function handleSubmitAvatarProfileForm(evt) {
    evt.preventDefault();
    profileAvatarFormSubmitButton.textContent = 'Сохранение...';
    const avatarLink = profileAvatarLinkField.value;
    patchAvatarPicture(avatarLink)
        .then((data) => {
            profileAvatarElement.style.backgroundImage = `url("${data.avatar}")`;
            closePopup(evt.target.closest('.popup'));
        })
        .catch(err => console.log(err))
        .finally(() => {
            profileAvatarFormSubmitButton.textContent = 'Сохранить';
        })
}

function handleSubmitPlaceForm(evt) {
    evt.preventDefault();
    placeProfileFormSubmitButton.textContent = 'Сохранение...';
    postCard(placeFormPlaceField.value, placeFormLinkField.value)
        .then((data) => {
            const card = createCard(data, userId)
            cardContainer.prepend(card);
            closePopup(evt.target.closest('.popup'));
        })
        .catch(err => console.log(err))
        .finally(() => {
            placeProfileFormSubmitButton.textContent = 'Сохранить';
        })
}

// EVENTS AFTER PAGE LOADING
renderPageAtInit();

// EVENT LISTENERS
//modal popups
enableValidation(validationSelectors);
setCloseEventListenersToCrosses();

// ---> profile
profileEditButton.addEventListener('click', handleOpenProfileForm);
profileForm.addEventListener('submit', handleSubmitProfileForm);
profileAvatarElement.addEventListener('click', handleOpenAvatarForm);
profileAvatarForm.addEventListener('submit', handleSubmitAvatarProfileForm);

// ---> places
placeEditButton.addEventListener('click', handleOpenPlaceForm);
placeForm.addEventListener('submit', handleSubmitPlaceForm);


//EXPORTING
export {validationSelectors}