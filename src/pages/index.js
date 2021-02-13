import './index.css';  // расскоментировать для вебпака


// ---------------  импорт модулей  -----------------
import { Card } from '../components/Card.js'
import Section  from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../utils/constants.js'
import { elementsForValidation } from '../utils/constants.js'
import { UserInfo } from '../components/UserInfo.js'

//---------------- popup добавления места ----------------
const buttonOpenPopupAddPlace = document.querySelector('.button_type_add');
const addPlaceFormElement = document.querySelector('#place-add');  // находим форму
const buttonAddPlace = addPlaceFormElement.querySelector('#button-add-place');
// ---------------  popup редактирования юзера  -----------------
const nameProfile = document.querySelector('.profile__name');  
const jobProfile = document.querySelector('.profile__job');
const profileFormElement = document.querySelector('#user-information');  // находим форму юзера
const nameInput = profileFormElement.querySelector('#user-name'); // поле имени юзера
const jobInput = profileFormElement.querySelector('#user-job');   // поле деятельности юзера
const buttonOpenPopupProfile = document.querySelector('.button_type_edit');
const buttonSubmitUser = profileFormElement.querySelector('.button_type_save');



//------------------ инициализация формы юзера ----------------------

const userInfo = new UserInfo (jobProfile, nameProfile);  // получение и запись данных пользователя

const userForm = new PopupWithForm ('#user-information', (userData) => {
    const newName = userData["user-name"];
    const newJob =  userData["user-job"];
    userInfo.setUserInfo({ newElementJob: newJob, newElementName: newName })
  });
userForm.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => {
  const {
    userProfileJob,
    userProfileName
  } = userInfo.getUserInfo();         // получить данные из разметки
  nameInput.value = userProfileName;  // подгружаем значения профиля в инпуты
  jobInput.value =  userProfileJob;

   userForm.openPopup();
//   buttonSubmitUser.classList.add('button_type_inactive'); // деактивация кнопки при закрытии формы без сабмита. 
   buttonSubmitUser.disabled = true;
});

//--------------- инструменты для карточек -------------------
function createCard(item) {
  const card = new Card ({  
    data: item, 
    handleCardClick: (previewData) => { // просмотрщик изображения карточки
      imageForm.openPopup(previewData);
    }
 },
 '#add-card-template'
 );
const cardElement = card.generateCard();
return cardElement;
}

//--------------- создание карточек из массива ---------------

const imageForm = new PopupWithImage ('#view-image'); 
imageForm.setEventListeners(); 

const cardsList = new Section({ // отрисовка массива initialCards
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
    }
  },
  '.cards'
);
cardsList.renderItems(); // вызывает renderer

//---------------- карточка из формы ------------------------
function handleFormNewCard(newPlaceData) {  // отрисовка формы нового места
  // вытащить из newPlaceData линк и имя и залить в итемс formNewCard

  const cardNewElement = createCard({ name: newPlaceData["place-name"], link: newPlaceData["place-link"] });

  cardsList.addItemPrepend(cardNewElement); // кроме контейнера от конструктора Section ничего и не нужно!!!!
};

const placeForm = new PopupWithForm ('#place-add', handleFormNewCard);
placeForm.setEventListeners();  // запустит handleFormSubmit при сабмите и закроется форма

buttonOpenPopupAddPlace.addEventListener('click', () => {
placeForm.openPopup();
// buttonAddPlace.classList.add('button_type_inactive'); // деактивация кнопки при закрытии формы без сабмита. 
buttonAddPlace.disabled = true;
});


//--------------- валидация ------------------
const formElements = Array.from(document.querySelectorAll(elementsForValidation.formSelector));  // создаем массив форм
formElements.forEach(form => {
 const formElement = new FormValidator (elementsForValidation, form);
 formElement.enableValidation();  // передаем на валидацию объект со стилями формы
});
