// ---------------  импорт модулей  -----------------
import { Card } from '../components/Card.js'
import Section  from '../components/Section.js'
import { Popup, PopupWithForm, PopupWithImage } from '../components/Popup.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../components/constants.js'
import { elementsForValidation } from '../components/constants.js'
import { UserInfo, buttonOpenPopupProfile, buttonSubmitUser, nameProfile, jobProfile, nameInput, jobInput, profileFormElement } from '../components/UserInfo.js'

// const popupAreas =  Array.from(document.querySelectorAll('.popup')); // массив полей попапа

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

/*
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
*/

//--------------- работа с popup ---------------
/*
const userForm = new Popup (profileFormElement);
buttonOpenPopupProfile.addEventListener("click", () =>  userForm.open());
userForm.setEventListeners();
// userForm.open();
*/

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
