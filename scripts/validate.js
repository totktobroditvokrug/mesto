function checkButtonInForm (elementsForValidation, formElement){
    console.log('проверка наличия кнопки');
    const buttonElement = formElement.querySelector(elementsForValidation.submitButtonSelector);
    if (buttonElement !== null){  // проверка формы на наличие кнопки submit
        console.log('кнопка есть');
        return true;
    }
    return false;
}

function showError(elementsForValidation, formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(elementsForValidation.inputErrorClass);
}

function hideError(elementsForValidation, formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(elementsForValidation.inputErrorClass);
}

function checkInputValidity(elementsForValidation, formElement, input) {
    hideError(elementsForValidation, formElement, input);
    if (!input.checkValidity()) {
        showError(elementsForValidation, formElement, input);
    }
}

function toggleButtonState(elementsForValidation, formElement, buttonElement) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove(elementsForValidation.inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(elementsForValidation.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function setEventListeners(elementsForValidation, formElement) {
    const inputElements = Array.from(formElement.querySelectorAll(elementsForValidation.inputSelector));
      if(checkButtonInForm (elementsForValidation, formElement)){
        const buttonElement = formElement.querySelector(elementsForValidation.submitButtonSelector);
        inputElements.forEach((input) => {
            input.addEventListener('input', (evt) => {
                checkInputValidity(elementsForValidation, formElement, evt.target);
                toggleButtonState(elementsForValidation, formElement, buttonElement);
            });
        });
        toggleButtonState(elementsForValidation, formElement, buttonElement);
    } 
}

function resetTextErrors(formElement) {  // сброс ошибок для повторного открытия полей, закрытых с ошибками
    const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
    inputElements.forEach((input) => {
        hideError(elementsForValidation, formElement,input);
    });
}


function enableValidation(elementsForValidation) {   // валидация вызывается при открытии формы в index.js, иначе повторное открытие не ставит disable на кнопки
    const formElements = Array.from(document.querySelectorAll(elementsForValidation.formSelector));
    formElements.forEach(form => {
//        console.log(form);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(elementsForValidation, form);
    });
}

const elementsForValidation = {   // объявляем объект со стилями форм для валидации отдельно без вызова функции
    formSelector: '.popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    formIsActive: 'popup_on'
};

enableValidation(elementsForValidation);  // передаем на валидацию объект со стилями формы