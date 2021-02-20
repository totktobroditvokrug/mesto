//---------------- карточки ООП -----------------
import { myServerId, userUrl, cardUrl, avatarUrl } from '../utils/constants.js'
export class Card {
	constructor({ data, handleCardClick, deleteCardCallback, updateCardView, removeLikeFromServer, setLikeToServer}, cardSelector) {
    this._data = data;
    
		this._text = data.name;
		this._image = data.link;
    this._likes = data.likes;
    this._cardId = data.cardId; // идентификатор изображения с сервера
    this._userId = data.userId;    // идентификатор юзера
    this._handleCardClick = handleCardClick; // функция вызова просмотра карточки
    this._deleteCardCallback = deleteCardCallback;  // функция удаления карточки
    this._removeLikeFromServer = removeLikeFromServer;
    this._setLikeToServer = setLikeToServer;
    this._updateCardView = updateCardView;  // пригодится
		this._cardSelector = cardSelector;
    this._dataPreview = {
      link: this._image,
      title: this._text
    };
	}
 
	_getTemplate() {  // клонировать по '#add-card-template'
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    
    return cardElement;
    }

    _handlerLikeIcon = (evt) => {       // реакция на лайк внутри карточки
      const objectLike = evt.target.closest('.card').querySelector('.counter');
      let cardIsLike = false; // ставим первоначально отсутствие лайка
            cardIsLike = false;  // считаем, что нет лайка от юзера
            this._likes.forEach((item) => {  // ищем в массиве лайк от юзера
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
              this._removeLikeFromServer(this._cardId)  // запрос на сервер по идентификатору карточки
              .then((result) => {
                 this._likes = result.likes;  // обновить состояние карточек
                 console.log('лайк снят');
                 objectLike.textContent = result.likes.length;
              })
              .catch((err) => {
                  console.log('лайк не снялся');
                  console.log(err);
                }); 
            }
            else {                    // если лайка не было, ставим
              evt.target.classList.add('card__like_active');
              this._setLikeToServer(this._cardId)
              .then((result) => {
                this._likes = result.likes;  // обновить состояние карточек
                console.log('лайк поставлен');
                objectLike.textContent = result.likes.length;
              })
              .catch((err) => {
                console.log('лайк не залетел');
                console.log(err);
              })
            }
    }

    _handleDeleteCard = (evt) => {
      this._deleteCardCallback(this._cardId, evt);
    }
 
    _setEventListeners() {  // слушатели кнопок
      const myServerId = "f87caedede5ba1f17713b304";
        if (this._userId === myServerId) {
          console.log('это моя карточка, ставлю слушатель удаления');
          this._element.querySelector('.button_type_trash').addEventListener('click', this._handleDeleteCard);
        }
        else {
          this._element.querySelector('.button').classList.add('button_type_no-trash');
        }
        this._element.querySelector('.button_type_like').addEventListener('click', this._handlerLikeIcon);
  
        this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleCardClick(this._dataPreview);
        });
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