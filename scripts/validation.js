const showInputError = (formEl, inputEl, {inputErrorClass, errorClass}) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`)
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass)
}

const hideInputError = (formEl, inputEl, {inputErrorClass, errorClass}) => {

  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`)
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass)
}

const checkInputValidity = (formEl, inputEl, options) => {
  if(!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
    } else {
    hideInputError(formEl, inputEl, options);
  }
}

const isInvalidInput = (inputList) => {
  return !inputList.every(inputEl => inputEl.validity.valid);
}

const disabledButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;

}

const enabledButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

const toggleButtonState = (inputEls, submitButton, {inactiveButtonClass}) => {
  if (isInvalidInput(inputEls)) {
    disabledButton(submitButton, inactiveButtonClass);
  } else {
    enabledButton(submitButton, inactiveButtonClass)
  }

}

const setEventListeners = (formEl, {inputSelector, submitButtonSelector}) => {
  const inputEls = [...formEl.querySelectorAll(inputSelector)]
  const submitButton = formEl.querySelector(submitButtonSelector)

  inputEls.forEach(inputEl => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options)
      toggleButtonState(inputEls, submitButton, options);
    })
  })
}

const enableValidation = ({formSelector}) => {
  const formEls = [...document.querySelectorAll(formSelector)];

  formEls.forEach(formEl => {
    formEl.addEventListener("submit", e => {
      e.preventDefault();
    })

    setEventListeners(formEl, options);
  })
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
}

enableValidation(options);
