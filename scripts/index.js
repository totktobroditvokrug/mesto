// ---------------  импорт модулей  -----------------
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './constants.js';
import { elementsForValidation } from './constants.js';

const popupAreas =  Array.from(document.querySelectorAll('.popup')); // массив полей попапа

// ---------------  popup редактирования юзера  -----------------
const nameProfile = document.querySelector('.profile__name');  
const jobProfile = document.querySelector('.profile__job');
const profileFormElement = document.querySelector('#user-information');  // находим форму юзера
const nameInput = profileFormElement.querySelector('#user-name'); // поле имени юзера
const jobInput = profileFormElement.querySelector('#user-job');   // поле деятельности юзера
const buttonOpenPopupProfile = document.querySelector('.button_type_edit');
const buttonClosePopupProfile = profileFormElement.querySelector('.button_type_close');

//---------------- popup добавления места ----------------
const buttonOpenPopupAddPlace = document.querySelector('.button_type_add');
const addPlaceFormElement = document.querySelector('#place-add');  // находим форму
const namePlace = addPlaceFormElement.querySelector('#place-name'); // название места
const linkPlace = addPlaceFormElement.querySelector('#place-link');   // ссылка на изображение места
const buttonClosePopupAddPlace = addPlaceFormElement.querySelector('.button_type_close');
const buttonAddPlace = addPlaceFormElement.querySelector('#button-add-place');
const placeList = document.querySelector('.cards'); // начало контейнера для карточек

//---------------- popup просмотра фотографий ----------------

export const formViewImage = document.querySelector('#view-image');  // находим блок просмотра фотографии
export const buttonCloseViewImage = formViewImage.querySelector('.button_type_close2');
export const viewImageTitle = formViewImage.querySelector('.signature_dark');
export const viewImageLink = formViewImage.querySelector('.photo');

// const addCardTemplate = document.querySelector('#add-card-template');  // поиск шаблона


function  closePopupOnEscape (evt){  // закрытие активного попапа по Escape
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_on'));
    }     
}

export function openPopup(form) {   // открывальщик всех форм
    form.classList.add('popup_on');
    document.addEventListener('keydown', closePopupOnEscape);
}

function closePopup(form) {  // закрывальщик всех форм
    form.classList.remove('popup_on');
    document.removeEventListener('keydown', closePopupOnEscape);
}

const onClickPopupLayout = (evt) => {
    if(evt.target === evt.currentTarget){
      closePopup(evt.currentTarget);  // закрываем текущую форму по клику вне его
    }
}

function editPopupProfile() {   // 
    nameInput.value = nameProfile.textContent;  // подгружаем значения профиля
    jobInput.value = jobProfile.textContent;
//    profileFormElement.resetTextErrors();  // сброс старых текстов ошибок при редактировании профиля
    openPopup(profileFormElement);
}

popupAreas.forEach((area) => {  // каждому попапу слушатель мышки
    area.addEventListener('mousedown', onClickPopupLayout);
});

buttonOpenPopupProfile.addEventListener("click", () =>  editPopupProfile());
buttonClosePopupProfile.addEventListener("click", () =>  closePopup(profileFormElement));

function submitProfile (evt) {   // заполнение формы профиля без отправки
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profileFormElement);
}

profileFormElement.addEventListener('submit', submitProfile);  // реагирует на enter без дополнительного кода

buttonOpenPopupAddPlace.addEventListener("click", () => {
//    addPlaceFormElement.resetTextErrors();  // сброс старых текстов ошибок при добавления карточек
//    console.log(addPlaceFormElement);
    addPlaceFormElement.reset();
    buttonAddPlace.classList.add('button_type_inactive');
    buttonAddPlace.disabled = true;
    openPopup(addPlaceFormElement);
});

buttonClosePopupAddPlace.addEventListener("click", () =>  closePopup(addPlaceFormElement));

//--------------- создание карточек ---------------
initialCards.forEach((item) => {
    const card = new Card (item, '#add-card-template');
    const cardElement =  card.generateCard();
    placeList.append(cardElement);
}); // заливаем инициализированные карточки на страницу

function addPlace(evt) {  // добавить новую карточку по кнопке Создать
    evt.preventDefault();
    const item = {
        name: namePlace.value,
        link: linkPlace.value 
    }
    const card = new Card (item, '#add-card-template');
    const cardElement =  card.generateCard();
    placeList.prepend(cardElement); 
    addPlaceFormElement.reset();
    closePopup(addPlaceFormElement);
}

addPlaceFormElement.addEventListener("submit", addPlace);

buttonCloseViewImage.addEventListener("click", () => closePopup(formViewImage));


//--------------- валидация ------------------
const formElements = Array.from(document.querySelectorAll(elementsForValidation.formSelector));  // создаем массив форм
formElements.forEach(form => {
//  console.log(form);
 const formElement = new FormValidator (elementsForValidation, form);
 formElement.enableValidation();  // передаем на валидацию объект со стилями формы
});