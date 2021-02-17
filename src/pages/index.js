// import './index.css';  // расскоментировать для вебпака


// ---------------  импорт модулей  -----------------
import { Card } from '../components/Card.js'
import Section  from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { FormValidator } from '../components/FormValidator.js'
 import { initialCards } from '../utils/constants.js'
import { elementsForValidation } from '../utils/constants.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'

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

//--------------- инструменты для карточек -------------------
function createCard(item) {
  const card = new Card ({  
    data: item, 
    handleCardClick: (previewData) => { // просмотрщик изображения карточки
      imageForm.openPopup(previewData);
    },
    handleLikeClick: () => {
      console.log(`данные карточки`);
      console.log(item);
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
/*
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
*/

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


//----------------- работа с API ----------------
//адреса для API
const myServerId = "f87caedede5ba1f17713b304";

const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-20/';

const userUrl = 'users/me';
const cardUrl = 'cards';

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: '52d9d703-f9d4-41bc-9951-d16f2045b1bc',
    'Content-Type': 'application/json'
  }
});

/*
function testApi() {
  return fetch(baseUrl + cardUrl, {
    headers: {
    authorization: '52d9d703-f9d4-41bc-9951-d16f2045b1bc',
    'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
  .then((result) => {
    console.log(result);
  });
}
 testApi();
 */


const initialCardsServer = []; // массив для получения данных карточек с сервера {name: '', link:''}
const cardsListServer = new Section({ // отрисовка массива initialCards
  items: initialCardsServer,
  renderer: (item) => {
      const cardElement = createCard(item);
      cardsListServer.addItem(cardElement);
  }
},
'.cards'
);
const cardsFromServer =  api.getInitialCards(cardUrl);
cardsFromServer.then((result) => {
 // console.log(result);

  console.log('Загрузка картинок с сервера');
  for(let i=0; i < result.length; i++) {
    initialCardsServer[i] = {
      name: result[i].name,
      link: result[i].link,
      likes: result[i].likes
    }
  }
 // console.log(initialCardsServer);
  cardsListServer.renderItems(); // вызывает renderer
})
.catch((err) => {
  console.log(err);
});

//---------------- карточка из формы ------------------------
function handleFormNewCard(newPlaceData) {  // отрисовка формы нового места
  // вытащить из newPlaceData линк и имя и залить в итемс formNewCard

  const cardNewElement = createCard({ name: newPlaceData["place-name"], link: newPlaceData["place-link"] });
  const cardToServer = api.setNewCard(cardUrl, { name: newPlaceData["place-name"], link: newPlaceData["place-link"] });
  cardToServer
  .then((data) => {
    console.log('новая карточка успешно отправлена');
    console.log(data);
   })
  .catch((err) => {
     console.log(err);
   });
  cardsListServer.addItemPrepend(cardNewElement); // кроме контейнера от конструктора Section ничего и не нужно!!!!
};

const placeForm = new PopupWithForm ('#place-add', handleFormNewCard);
placeForm.setEventListeners();  // запустит handleFormSubmit при сабмите и закроется форма

//------------------ инициализация формы юзера ----------------------

const userInfo = new UserInfo (jobProfile, nameProfile);  // элементы для данных пользователя

const userForm = new PopupWithForm ('#user-information', (userData) => {  // считываем данные из формы
    const newName = userData["user-name"];
    const newJob =  userData["user-job"];
    api.setUserInfo(userUrl, {
      name: newName,
      about: newJob
    } // отправить данные на сервер
    )
      .then((data) => {
        console.log(data);
       })
      .catch((err) => {
         console.log(err);
       });
    userInfo.setUserInfo({ newElementJob: newJob, newElementName: newName })
  });
userForm.setEventListeners();  // после сабмита вызовет колбэк записи новых данных и закроется

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

//-------------- работа сервера с данными юзера -----------------------

const userInfoFromServer =  api.getUserInfo(userUrl);
userInfoFromServer.then((user) => {
  console.log(user);
  userInfo.setUserInfo({ newElementJob: user.about, newElementName: user.name }) // положить на страницу
})

