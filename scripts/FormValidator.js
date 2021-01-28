//----------------- валидация по ООП -----------------------
export const elementsForValidation = {   // объявляем объект со стилями форм для валидации отдельно без вызова функции
    formSelector: '.popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    formIsActive: 'popup_on'
};


export class FormValidator {
    constructor (config, form) {
      this._form = form;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
    }
  
    _checkButtonInForm () {
        if (this._form.querySelector(this._submitButtonSelector) !== null){  // проверка формы на наличие кнопки submit
            return true;
        }
        return false;
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
        this._hideError(input);
        if (!input.checkValidity()) {
            this._showError(input);
        }
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
    const inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));

      if(this._checkButtonInForm ()){
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        inputElements.forEach((input) => {
            input.addEventListener('input', (evt) => {
                // console.log('слушатель инпута');
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
    const inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputElements.forEach((input) => {
        this._hideError(input);
    });
  }
}
