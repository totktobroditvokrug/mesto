import './pages/index.css';  // для вебпака


// ---------------  импорт модулей  -----------------
import { Card } from './components/Card.js'
import Section  from './components/Section.js'
import { Popup, PopupWithForm, PopupWithImage } from './components/Popup.js'
import { FormValidator } from './components/FormValidator.js'
import { initialCards } from './components/constants.js'
import { elementsForValidation } from './components/constants.js'
import { UserInfo } from './components/UserInfo.js'

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
const placeForm = new PopupWithForm (addPlaceFormElement, (placeData) => {  // отрисовка карточки из формы
    console.log(placeData);
    const titleCard = placeData["place-name"];
    const linkCard =  placeData["place-link"];
    const formCard = new Section({ // отрисовка массива initialCards
        items: [ {name: titleCard, link: linkCard}],
        renderer: (item) => {
            const card = new Card ({
                  data: item, 
                  handleCardClick: (previewData) => { // просмотрщик изображения карточки
                      const imageForm = new PopupWithImage (formViewImage, previewData);
                      imageForm.openPopup();
                      imageForm.setEventListeners();    
                  }
               },
               '#add-card-template'
               );
            const cardElement =  card.generateCard();
            formCard.addItemPrepend(cardElement);
        }
      },
      '.cards'
    );
    formCard.renderItems();
  });
  buttonOpenPopupAddPlace.addEventListener('click', () => {
  placeForm.openPopup();
  placeForm.setEventListeners();
  console.log('открытие профиля места');
  // старый код
  buttonAddPlace.classList.add('button_type_inactive');
  buttonAddPlace.disabled = true;
});


buttonOpenPopupProfile.addEventListener('click', () => {
  const userInfo = new UserInfo (jobProfile, nameProfile);
  const {
    userProfileJob,
    userProfileName
  } = userInfo.getUserInfo();
  nameInput.value = userProfileName;  // подгружаем значения профиля
  jobInput.value =  userProfileJob;
   console.log(userProfileName, userProfileJob);
  const userForm = new PopupWithForm (profileFormElement, (userData) => {
    const newName = userData["user-name"];
    const newJob =  userData["user-job"];
    userInfo.setUserInfo({ newElementJob: newJob, newElementName: newName })
    console.log(userData);
  });
 
   userForm.openPopup();
   userForm.setEventListeners();
   console.log('открытие профиля юзера');
   buttonSubmitUser.classList.add('button_type_inactive');
   buttonSubmitUser.disabled = true;
});

//--------------- создание карточек ---------------

const cardsList = new Section({ // отрисовка массива initialCards
    items: initialCards,
    renderer: (item) => {
        const card = new Card ({
              data: item, 
              handleCardClick: (previewData) => { // просмотрщик изображения карточки
                const imageForm = new PopupWithImage (formViewImage, previewData);
                  imageForm.openPopup();
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
cardsList.renderItems();


//--------------- валидация ------------------
const formElements = Array.from(document.querySelectorAll(elementsForValidation.formSelector));  // создаем массив форм
formElements.forEach(form => {
//  console.log(form);
 const formElement = new FormValidator (elementsForValidation, form);
 formElement.enableValidation();  // передаем на валидацию объект со стилями формы
// console.log(formElement);
});
