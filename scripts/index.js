


let buttonOpenPopup = document.querySelector('.button__edit');
let buttonClosePopup = document.querySelector('.button__close');
let popup = document.querySelector('.popup');
function popupToggle() {
    popup.classList.toggle('popup_on');
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle);


let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
console.log(nameProfile.textContent);

// Находим форму в DOM

let formElement = document.querySelector('.button__save');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('#name-field').value;
    let jobInput = document.querySelector('#job-field').value;

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameInput;
    jobProfile.textContent = jobInput;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('click', formSubmitHandler); 
