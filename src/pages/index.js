 import './index.css';  // для вебпака


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

const formViewImage = document.querySelector('#view-image');  // находим блок просмотра фотографии

const userInfo = new UserInfo (jobProfile, nameProfile);

const userForm = new PopupWithForm ('#user-information', (userData) => {
    const newName = userData["user-name"];
    const newJob =  userData["user-job"];
    userInfo.setUserInfo({ newElementJob: newJob, newElementName: newName })
    console.log(userData);
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

   buttonSubmitUser.classList.add('button_type_inactive');
   buttonSubmitUser.disabled = true;
});

//--------------- создание карточек из массива ---------------

const imageForm = new PopupWithImage ('#view-image');  // единственный попап просмотрщика

const cardsList = new Section({ // отрисовка массива initialCards
    items: initialCards,
    renderer: (item) => {
        const card = new Card ({  // поскольку items - массив, создается несколько экземпляров карточек
              data: item, 
              handleCardClick: (previewData) => { // просмотрщик изображения карточки
                imageForm.openPopup(previewData);
                imageForm.setEventListeners();    
              }
           },
           '#add-card-template'
           );
        const cardElement =  card.generateCard();
        cardsList.addItem(cardElement);
    }
  },
  '.cards'
);
cardsList.renderItems(); // вызывает renderer

//---------------- карточка из формы ------------------------



function handleFormNewCard(newPlaceData) {  // отрисовка формы нового места
  console.log(newPlaceData);
  console.log('внешняя функция');
  // вытащить из newPlaceData линк и имя и залить в итемс formNewCard

  const formNewCard = new Section({ // ---- как это сделать не объявляя новые Section  для меня непостижимая загадка
    items: [{ name: newPlaceData["place-name"], link: newPlaceData["place-link"] }], // залить данные формы через глобальные переменные
    renderer: (item) => {
        const cardNew = new Card ({ 
              data: item, 
              handleCardClick: (previewData) => { // просмотрщик изображения карточки
                imageForm.openPopup(previewData);
                imageForm.setEventListeners();    
              }
           },
           '#add-card-template'
           );
           const cardNewElement =  cardNew.generateCard();
           cardsList.addItemPrepend(cardNewElement);
    }
  },
  '.cards'
  );
  // в этот момент надо рисовать новую карточку

  formNewCard.renderItems(); // вызывает renderer для новой карточки
};

const placeForm = new PopupWithForm ('#place-add', handleFormNewCard);
placeForm.setEventListeners();  // запустит handleFormSubmit при сабмите и закроется форма

buttonOpenPopupAddPlace.addEventListener('click', () => {
placeForm.openPopup();
placeForm.setEventListeners();
console.log('открытие профиля места');
// старый код
buttonAddPlace.classList.add('button_type_inactive');
buttonAddPlace.disabled = true;
});


//--------------- валидация ------------------
const formElements = Array.from(document.querySelectorAll(elementsForValidation.formSelector));  // создаем массив форм
formElements.forEach(form => {
//  console.log(form);
 const formElement = new FormValidator (elementsForValidation, form);
 formElement.enableValidation();  // передаем на валидацию объект со стилями формы
// console.log(formElement);
});


/*
const cardNewPlace = new Card ({
    data: {name: titleCard, link: linkCard}, 
    handleCardClick: (previewData) => { // просмотрщик изображения карточки
      console.log('handle создания карточки');
      console.log(previewData);
    }
  },
  '#add-card-template'
  );
  cardNewPlace.generateCard();
// formCard.addItemPrepend(cardElement);
//    const titleCard = placeData["place-name"];
//    const linkCard =  placeData["place-link"];
*/