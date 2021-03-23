//---------------- карточки ООП -----------------
import { userUrl, cardUrl, avatarUrl } from '../utils/constants.js'
export class Card {
	constructor({ data, myServerId, handleCardClick, deleteCardCallback, updateCardView, handlerLikeIcon}, cardSelector) {
    this._myServerId = myServerId;
    this._data = data;
    
		this._text = data.name;
		this._image = data.link;
    this._likes = data.likes;
    this._cardId = data.cardId; // идентификатор изображения с сервера
    this._userId = data.userId;    // идентификатор юзера
    this._handleCardClick = handleCardClick; // функция вызова просмотра карточки
    this._deleteCardCallback = deleteCardCallback;  // функция удаления карточки
    this._updateCardView = updateCardView;  // пригодится
    this._handlerLikeIcon = handlerLikeIcon;
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

    _refreshLikes = (newLikes) => {  // вызов колбэка в колбэке дожидающегося ответа сервера с новыми лайками
      this._likes = newLikes;
    }

    _handleDeleteCard = (evt) => {
      this._deleteCardCallback(this._cardId, evt);
    }
 
    _setEventListeners() {  // слушатели кнопок
      this._likeButton = this._element.querySelector('.button_type_like');
      this._likeCounter = this._element.querySelector('.counter');

        if (this._userId === this._myServerId) {
    //      console.log('это моя карточка, ставлю слушатель удаления');
          this._element.querySelector('.button_type_trash').addEventListener('click', this._handleDeleteCard);
        }
        else {
          this._element.querySelector('.button').classList.add('button_type_no-trash');
        }

        this._element.querySelector('.button_type_like').addEventListener('click', () => {
          this._handlerLikeIcon(
            this._cardId, this._likes, this._likeCounter,  this._likeButton, this._refreshLikes
          )    
        }
   
       );  // вызвать колбэк в идексе
  
        this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleCardClick(this._dataPreview);
        });
    }
   




    _loadLike(element, myServerId) {
      element.querySelector('.counter').textContent = this._likes.length;
      let cardIsLike = false; // ставим первоначально отсутствие лайка  
      this._likes.forEach((item) => {
        if (item._id === myServerId) {
          console.log('генерация карточки - это лайк юзера');
          cardIsLike = true;
          element.querySelector('.card__like').classList.add('card__like_active');
        }
        else {
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