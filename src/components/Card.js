//---------------- карточки ООП -----------------
import { api } from '../pages/index.js'
export class Card {

	constructor({ data, handleCardClick, handleLikeClick}, cardSelector) {
    this._data = data;
		this._text = data.name;
		this._image = data.link;
    this._likes = data.likes;
    this._cardId = data.cardId; // идентификатор изображения с сервера
    this._handleCardClick = handleCardClick; // функция вызова просмотра карточки
    this._handleLikeClick = handleLikeClick; // функция вызова лайка карточки
 //   this._refrechLike = refrechLike;
		this._cardSelector = cardSelector;
    this._dataPreview = {
      link: this._image,
      title: this._text
    };
//    this._element = '';  // тут все упадет, возможно
//    this._cardIsLike = false;
	}

	_getTemplate() {  // клонировать по '#add-card-template'
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
   
    return cardElement;
    }

    _handlerLikeIcon = (evt) => {       // реакция на лайк внутри карточки
      console.log('обработчик лайков в card');
      const myServerId = "f87caedede5ba1f17713b304";
      // console.log(evt.target.parent);
      const objectLike = evt.target.closest('.card').querySelector('.counter');
      let cardIsLike = false; // ставим первоначально отсутствие лайка
            console.log('заходим в обработчик клика');      
            console.log(this._likes);
            cardIsLike = false;  // считаем, что нет лайка от юзера
            this._likes.forEach((item) => {  // ищем в массиве лайк от юзера
              console.log(item._id);
              
              if (item._id === myServerId) {
                console.log('это лайк юзера');
                cardIsLike = true;
              }
              else {
                console.log('тут нет лайка юзера');
              }
            });
    
             if (cardIsLike) {  // если стоял лайк юзера, снимаем его
              evt.target.classList.remove('card__like_active');
              api.removeLikeFromServer(this._cardId)  // запрос на сервер по идентификатору карточки
              .then((result) => {
                 console.log(result);
                 console.log(this._likes);
                 this._likes = result.likes;  // обновить состояние карточек
                 console.log('лайк снят');
                 objectLike.textContent = result.likes.length;
                 return result;
      // обновить состояние карточек ???????
              })
              .catch((result) => {
                  console.log(result);
                  console.log('лайк не снялся');
                }); 
            }
            else {                    // если лайка не было, ставим
              evt.target.classList.add('card__like_active');
          return     api.setLikeToServer(this._cardId)
              .then((result) => {
                console.log(result); 
                this._likes = result.likes;  // обновить состояние карточек
                console.log('лайк поставлен');
                objectLike.textContent = result.likes.length;
                return result;
     
              })
              .catch((result) => {
                console.log(result);
                console.log('лайк не залетел');
              })
            }
    }

    refrechLike() {
      console.log('программа обновление лайков');
      // console.log(data);
      // this._likes = data.likes;
    }

    _handlerDeleteCard = (evt) => {                    // удаление карточки
            evt.target.closest('.card').remove();
    }

   
    _setEventListeners() {  // слушатели кнопок
        this._element.querySelector('.button_type_like').addEventListener('click', this._handlerLikeIcon);
        this._element.querySelector('.button_type_trash').addEventListener('click', this._handlerDeleteCard);
        this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleCardClick(this._dataPreview);
        });
      //this._element.querySelector('.card__image').addEventListener('click', console.log('как-то вызвать просмотрщик'));
    }
   
    _loadLike(element, myServerId) {
      element.querySelector('.counter').textContent = this._likes.length;
      let cardIsLike = false; // ставим первоначально отсутствие лайка  
      this._likes.forEach((item) => {
  //    console.log(item);
        if (item._id === myServerId) {
          console.log('генерация карточки - это лайк юзера');
          cardIsLike = true;
          element.querySelector('.card__like').classList.add('card__like_active');
        }
        else {
      //    console.log('генерация карточки - тут нет лайка юзера');
          cardIsLike = false;
        }
      });
    }


    generateCard(myServerId) {  // публичный метод с наполнением карточки
      this._element = this._getTemplate(); // вызов клона шаблона
      const imageOfCard = this._element.querySelector('.card__image');
      imageOfCard.src = this._image;
      imageOfCard.alt = this._text;
      this._element.querySelector('.card__name').textContent = this._text;
      this._loadLike(this._element, myServerId);  // инициализация лайков
      this._setEventListeners();
      return this._element;
    }
}