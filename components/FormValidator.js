export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
  }

  _showInputError(inputEl){
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`)
    inputEl.classList.add(this._settings.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._settings.errorClass)
  }


  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`)
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._settings.errorClass)
  }


  _checkInputValidity(inputEl) {
    if(!inputEl.validity.valid) {
      this._showInputError(inputEl);
      } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return !this._inputEls.every(inputEl => inputEl.validity.valid);
  }


  _disabledButton (inactiveButtonClass) {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enabledButton() {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton();
    } else {
      this._enabledButton()
    }
  }

  _setEventListeners() {

   this._inputEls = [...this._form.querySelectorAll(this._settings.inputSelector)]
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector)

    this._inputEls.forEach(inputEl => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl)
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._form.addEventListener("submit", e => {
      e.preventDefault();
    })

    this._setEventListeners();
  }

}
