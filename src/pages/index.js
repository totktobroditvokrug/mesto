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
    handleLikeClick: handleLikeClick
  },
  '#add-card-template'
  );
  const cardElement = card.generateCard(myServerId);
  return cardElement;
}



function  handleLikeClick(data, evt) {       // реакция на лайк внутри карточки
  console.log(evt.target);
  const objectLike = evt.currentTarget.querySelector('.counter');
  let cardIsLike = false; // ставим первоначально отсутствие лайка      
        console.log(data);
        cardIsLike = false;  // считаем, что нет лайка от юзера
        data.likes.forEach((item) => {  // ищем в массиве лайк от юзера
          console.log(item._id);
          
          if (item._id === myServerId) {
            console.log('это лайк юзера');
            cardIsLike = true;
          }
          else {
            console.log('тут нет лайка юзера');
          }
        });

        // if (cardIsLike) {  // если стоял лайк юзера, снимаем его
        //   api.removeLikeFromServer(data.cardId)  // запрос на сервер по идентификатору карточки
        //   .then((result) => {
        //      data = result;  // обновить состояние карточек
        //      console.log(result.likes.length);
        //      console.log('лайк снят')
        //   });
        //   evt.target.classList.remove('card__like_active');
        //   cardIsLike = false;  // сбросить флаг лайка юзера
        // }
        // else {                    // если лайка не было, ставим
        //   evt.target.classList.add('card__like_active');
        //   api.setLikeToServer(data.cardId)
        //   .then((result) => {
        //     data = result;  // обновить состояние карточек
        //     console.log(result.likes.length);
        //     console.log('лайк поставлен');
        //   });
        //   cardIsLike = true;  
        // }
     //  evt.target.classList.toggle('card__like_active');
//------------ проверка
          // evt.target.classList.add('card__like_active');
          // api.setLikeToServer(data.cardId)
          // .then((result) => {
          // //  data = result;  // обновить состояние карточек
          //   console.log(result.likes.length);
          //   console.log('лайк поставлен');
          // })
          // .catch((result) => {
          //   console.log(result);
          //   console.log('лайк не залетел');
          // })
          api.removeLikeFromServer(data.cardId)  // запрос на сервер по идентификатору карточки
          .then((result) => {
  //           data = result;  // обновить состояние карточек
             console.log(result.likes.length);
             console.log('лайк снят');
             objectLike.textContent = result.likes.length;
          })
          .catch((result) => {
              console.log(result);
              console.log('лайк не снялся');
            });
          evt.target.classList.remove('card__like_active');
          
  
}

//--------------- создание карточек из массива ---------------

const imageForm = new PopupWithImage ('#view-image'); 
imageForm.setEventListeners(); 

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

const initialCardsServer = []; // массив для получения данных карточек с сервера {name: '', link:''}
const cardsListServer = new Section({ // отрисовка массива initialCards
  items: initialCardsServer,
  renderer: (item) => {
//    console.log(item);
      const cardElement = createCard(item);
//      console.log(cardElement);
      cardsListServer.addItem(cardElement);
  }
},
'.cards'
);
const cardsFromServer =  api.getInitialCards(cardUrl);
cardsFromServer
  .then((result) => {
 // console.log(result);

    console.log('Загрузка картинок с сервера: успешно');
    for(let i=0; i < result.length; i++) {
      initialCardsServer[i] = {
        name: result[i].name,
        link: result[i].link,
        likes: result[i].likes,
        cardId: result[i]._id
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

//  const cardNewElement = createCard({ name: newPlaceData["place-name"], link: newPlaceData["place-link"] });
  const cardToServer = api.setNewCard(cardUrl, { name: newPlaceData["place-name"], link: newPlaceData["place-link"] });
  cardToServer
  .then((data) => {
    console.log('новая карточка успешно отправлена');
    console.log(data);
    data.cardId = data._id;
    const cardNewElement = createCard(data);
    cardsListServer.addItemPrepend(cardNewElement); // кроме контейнера от конструктора Section ничего и не нужно!!!!
   })
  .catch((err) => {
     console.log(err);
   });
 
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

// протестировать setLikeToServer(cardId) с конкретным идентификатором
/*
//-------------- тестовая функция API ---------------
function testApi() {
  return fetch(baseUrl + cardUrl + '/likes', {
    headers: {
    authorization: '52d9d703-f9d4-41bc-9951-d16f2045b1bc',
    'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
  .then((result) => {
    console.log('тестовое API');
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
  
}
 testApi();
*/

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