function setEscButtonClose(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function setOverlayClickClose(event) {
    if (event.target.classList.contains('popup_opened')) {
        closePopup(event.target);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', setEscButtonClose);
    popup.addEventListener('click', setOverlayClickClose);
}

function closePopup(popup) {
    const crossButton = popup.querySelector('.popup__close-button');
    const form = popup.querySelector('.popup__form');
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', setEscButtonClose);
    popup.removeEventListener('click', setOverlayClickClose);
}

export {openPopup, closePopup};
