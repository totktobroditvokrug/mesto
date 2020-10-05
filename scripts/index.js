


let buttonOpenPopup = document.querySelector('.button_edit');
let buttonClosePopup = document.querySelector('.button_close');
let popup = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name');  
let jobProfile = document.querySelector('.profile__job');

let formElement = document.querySelector('.popup');  // находим форму
let nameInput = formElement.querySelector('#user-name'); // поле имени
let jobInput = formElement.querySelector('#user-job');   // поле деятельности

function popupOpen() {
    nameInput.value = nameProfile.textContent;  // подгружаем значения профиля
    jobInput.value = jobProfile.textContent;
    popup.classList.add('popup_on');
}

function popupClose() {
    popup.classList.remove('popup_on');
}

buttonOpenPopup.addEventListener("click", popupOpen);
buttonClosePopup.addEventListener("click", popupClose);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
 
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);  // реагирует на enter без дополнительного кода
