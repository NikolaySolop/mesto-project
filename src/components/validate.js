const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

function disableButton(buttonElement, inactiveButtonClass) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
}

function enableButton(buttonElement, inactiveButtonClass) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
}

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass);
    } else {
        enableButton(buttonElement, inactiveButtonClass);
    }
};


const setEventListeners = (formElement,
                           formSelector,
                           inputSelector,
                           submitButtonSelector,
                           inactiveButtonClass,
                           inputErrorClass,
                           errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    inputList.forEach((inputElement) => {
        const buttonElement = inputElement.closest(formSelector).querySelector(submitButtonSelector);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, inputErrorClass, errorClass)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
        // я думал, что логичнее перенести листенер резета в ниже на 91 строку, так в случае добавления в setEventListeners
        // мы 2 раза навешиваем листенер на форму, потому что в цикле перебираем 2 раза поля (сколько полей, столько раз и навесим).
        // А в решении ниже мы перебираем формы и получается на каждую форму вешаем по одному слушателю, но к этому
        // добавляется лишний поиск кнопки.
        // Не знаю, какое решение эффективнее...
        formElement.addEventListener('reset', () => {
            disableButton(buttonElement, inactiveButtonClass);
        });
    });
};


const enableValidation = (formsDataSet) => {
    const formList = Array.from(document.querySelectorAll(formsDataSet.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(
            formElement,
            formsDataSet.formSelector,
            formsDataSet.inputSelector,
            formsDataSet.submitButtonSelector,
            formsDataSet.inactiveButtonClass,
            formsDataSet.inputErrorClass,
            formsDataSet.errorClass
        );
    });
};


export {enableValidation, isValid, toggleButtonState}