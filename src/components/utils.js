function setEscButtonClose(event) {
  const popup = document.querySelector('.popup_opened');
  if (event.key === 'Escape' && popup) {
    closePopup(popup);
  }
}

function setOverlayClickClose(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

function setCrossClickClose(event) {
  closePopup(event.target.closest('.popup_opened'));
}

function openPopup(popup) {
  const crossButton = popup.querySelector('.popup__close-button');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEscButtonClose);
  popup.addEventListener('click', setOverlayClickClose);
  crossButton.addEventListener('click', setCrossClickClose);
}

function closePopup(popup) {
  const crossButton = popup.querySelector('.popup__close-button');
  const form = popup.querySelector('.popup__form');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscButtonClose);
  popup.removeEventListener('click', setOverlayClickClose);
  crossButton.removeEventListener('click', setCrossClickClose);
  if (form) {
    form.reset();
  }
}

export { openPopup, closePopup };
