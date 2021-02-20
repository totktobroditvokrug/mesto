// import './index.css';  // расскоментировать для вебпака


// ---------------  импорт модулей  -----------------
import { Card } from '../components/Card.js'
import Section  from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { FormValidator } from '../components/FormValidator.js'
import { elementsForValidation } from '../utils/constants.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { Popup } from '../components/Popup.js'
import { myServerId } from '../utils/constants.js'

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
//---------------- popup подтверждения удаления карточки ----------------
const deleteConfirmFormElement = document.querySelector('#delete-confirm');  // находим форму
const buttonConfirm = deleteConfirmFormElement.querySelector('#button_type_confirm'); 
//---------------- popup редактирования аватара ----------------
const editAvatarForm = document.querySelector('#avatar-form');  // находим форму
const buttonSaveAvatar = editAvatarForm.querySelector('.button_type_save'); 

//---------------- активация редактирования аватара -------------
const editAvatarPen = document.querySelector('.avatar-edit');  // находим обертку аватара
const avatarOnProfile = document.querySelector('.profile__avatar');  // аватар в профиле страницы


//--------------- инструменты для карточек -------------------
function createCard(item) {
  const card = new Card ({  
    data: item, 
    handleCardClick: (previewData) => { // просмотрщик изображения карточки
      imageForm.openPopup(previewData);
    },
    deleteCardCallback: (cardId, evt) => {
      deleteCardOnServer(cardId, evt);
    },
    updateCardView: () => {

    },
    removeLikeFromServer: (cardId) => {
      return api.removeLikeFromServer(cardId);
    },
    setLikeToServer: (cardId) => {
      return api.setLikeToServer(cardId);
    },
  },
  '#add-card-template'
  );
  const cardElement = card.generateCard(myServerId);
  return cardElement;
}

function deleteCardOnServer(cardId, evt) { // вызовем функции апи, передадим ид карточки
  console.log('удаление карточки');
  confirmDel.openPopup();
  
  function apiDelCard() {
        document.removeEventListener('keydown', handleEnter);
      api.deleteCard(cardId)
      confirmDel.closePopup();
      evt.target.closest('.card').remove();
  }

  // ожидание клика по кнопке подтверждений или Enter
  const handleEnter = (evt) => {
      evt.preventDefault();
  if (evt.key === 'Enter') {

    apiDelCard();
    }  
  }
  document.addEventListener('keydown',  handleEnter);

  buttonConfirm.addEventListener('click', () => {
    apiDelCard();
  });
}

const confirmDel = new Popup('#delete-confirm');
confirmDel.setEventListeners();

//----------------- работа с API ----------------
// адреса для API (перенести в константы и экспортировать в кард и индекс)

const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-20/';


export const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: '52d9d703-f9d4-41bc-9951-d16f2045b1bc',
    'Content-Type': 'application/json'
  }
});


//---------------- загрузка карточек с сервера ----------------
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
const cardsFromServer =  api.getInitialCards();
cardsFromServer
  .then((result) => {
 // console.log(result);

    console.log('Загрузка картинок с сервера: успешно');
    for(let i=0; i < result.length; i++) {
      initialCardsServer[i] = {
        name: result[i].name,
        link: result[i].link,
        likes: result[i].likes,       // массив лайков
        cardId: result[i]._id,        // идентификатор карточки
        userId: result[i].owner._id,  // идентификатор автора карточки
      }
    }
   // console.log(initialCardsServer);
   cardsListServer.renderItems(); // вызывает renderer
  })
  .catch((err) => {
    console.log(err);
});

//--------------- форма создания карточки ---------------
const imageForm = new PopupWithImage ('#view-image'); 
imageForm.setEventListeners(); 

buttonOpenPopupAddPlace.addEventListener('click', () => {
  buttonAddPlace.textContent = 'Создать карточку';  // снять значение UX и записать стандартное
  buttonAddPlace.classList.add('button_type_inactive'); // деактивация кнопки при закрытии формы без сабмита. 
  buttonAddPlace.disabled = true;
  placeForm.openPopup();
});

//---------------- карточка из формы ------------------------
function handleNewCard(newPlaceData) {  // отрисовка формы нового места
  // вытащить из newPlaceData линк и имя и залить в итемс formNewCard
    buttonAddPlace.textContent = 'Сохранение...';  // UX
//  const cardNewElement = createCard({ name: newPlaceData["place-name"], link: newPlaceData["place-link"] });
  const cardToServer = api.setNewCard({ name: newPlaceData["place-name"], link: newPlaceData["place-link"] });
  cardToServer
  .then((data) => {
    console.log('новая карточка успешно отправлена');
    data.cardId = data._id;
    data.userId = myServerId;
    const cardNewElement = createCard(data);
    cardsListServer.addItemPrepend(cardNewElement);
    placeForm.closePopup();
   })
  .catch((err) => {
     console.log(err);
   });
};

const placeForm = new PopupWithForm ('#place-add', handleNewCard);
placeForm.setEventListeners();  // запустит handleFormSubmit при сабмите и закроется форма

//----------------- работа с лайками ----------------

function handleLikeOnServer(cardId, likes, evt) {
  console.log(evt.target.tagName);
  console.log(cardId);
}


//------------------ инициализация формы юзера ----------------------

const userInfo = new UserInfo (jobProfile, nameProfile);  // элементы для данных пользователя

const userForm = new PopupWithForm ('#user-information', (userData) => {  // считываем данные из формы при отправке
    buttonSubmitUser.textContent = 'Сохранение...';  // UX
    const newName = userData["user-name"];
    const newJob =  userData["user-job"];
    api.setUserInfo({
      name: newName,
      about: newJob
    } // отправить данные на сервер
    )
      .then((data) => {
        buttonSubmitUser.textContent = 'Сохранить';  // UX
        console.log(data);
        userForm.closePopup();
       })
      .catch((err) => {
         console.log(err);
         buttonSubmitUser.textContent = 'Сохранить еще раз';  // UX
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
   buttonSubmitUser.classList.add('button_type_inactive'); // деактивация кнопки при закрытии формы без сабмита. 
   buttonSubmitUser.disabled = true;
});

//-------------- работа сервера с данными юзера -----------------------

const userInfoFromServer =  api.getUserInfo();
userInfoFromServer
.then((user) => {
  console.log(user);
  userInfo.setUserInfo({ newElementJob: user.about, newElementName: user.name }) // положить на страницу
  avatarOnProfile.src =  user.avatar;
})
.catch((err) => {
  console.log(err);
});

const editAvatar = new PopupWithForm('#avatar-form', (user) => {  // => колбэк сабмита
  console.log(buttonSaveAvatar.textContent);
  buttonSaveAvatar.textContent = 'Сохранение...';  // UX
  api.setAvatar(user["avatar-link"])
  .then(res => {
    console.log(`аватар обновлен: ${res}`);
    avatarOnProfile.src =  user["avatar-link"];
    editAvatar.closePopup();
  })
  .catch((err) => {
    console.log(err);
    buttonSaveAvatar.textContent = 'Создать еще раз';  // UX при ошибке обновления
  });
});
editAvatar.setEventListeners();
editAvatarPen.addEventListener('click', () => {
  buttonSaveAvatar.textContent = 'Сохранить аватар';  // UX
  buttonSaveAvatar.classList.add('button_type_inactive'); // деактивация кнопки при закрытии формы без сабмита. 
  buttonSaveAvatar.disabled = true;
  editAvatar.openPopup();

});


//--------------- валидация ------------------
const formElements = Array.from(document.querySelectorAll(elementsForValidation.formSelector));  // создаем массив форм
formElements.forEach(form => {
 const formElement = new FormValidator (elementsForValidation, form);
 formElement.enableValidation();  // передаем на валидацию объект со стилями формы
});

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