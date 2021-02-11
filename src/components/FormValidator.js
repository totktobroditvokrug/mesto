//----------------- валидация по ООП -----------------------
export class FormValidator {
    constructor (config, form) {
      this._form = form;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }
  
    _checkButtonInForm () {
        return this._form.querySelector(this._submitButtonSelector) !== null; // проверка формы на наличие кнопки submit
   
    }
    
    _showError(input) {  // вывод текста ошибки валидации
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.textContent = input.validationMessage;
        input.classList.add(this._inputErrorClass);
    }
    
    _hideError(input) {  // удаление поля ошибок
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.textContent = '';
        input.classList.remove(this._inputErrorClass);
    }
    
    _checkInputValidity(input) {
        if (!input.checkValidity()) {
            this._showError(input);
        }
        else this._hideError(input);
    }

    _toggleButtonState(buttonElement) {
        if (this._form.checkValidity()) {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        } else {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        }
    }

  _setEventListeners() {
      if(this._checkButtonInForm ()){
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
              this._checkInputValidity(evt.target);
              this._toggleButtonState(buttonElement);
        });
      });
      this._toggleButtonState(buttonElement);
    }    
  } 

  enableValidation() {   // публичный валидатор
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  
  resetTextErrors() {  // сброс ошибок для повторного открытия полей, закрытых с ошибками
      this._inputList.forEach((input) => {
      this._hideError(input);
    });
  }
}
