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
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
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
        const buttonElement = formElement.querySelector(formsDataSet.submitButtonSelector);
        formElement.addEventListener('reset', () => {
            buttonElement.disabled = true;
            buttonElement.classList.add(formsDataSet.inactiveButtonClass);
        });
    });
};


export {enableValidation, isValid, toggleButtonState}