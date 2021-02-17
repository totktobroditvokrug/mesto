//---------------- карточки ООП -----------------
import { api } from '../pages/index.js'
export class Card {

	constructor({ data, handleCardClick, handleLikeClick}, cardSelector) {
		this._text = data.name;
		this._image = data.link;
    this._likes = data.likes;
    this._cardId = data.cardId; // идентификатор изображения с сервера
    this._handleCardClick = handleCardClick; // функция вызова просмотра карточки
    this._handleLikeClick = handleLikeClick; // функция вызова лайка карточки
		this._cardSelector = cardSelector;
    this._dataPreview = {
      link: this._image,
      title: this._text
    }
    this._cardIsLike = false;
	}

	_getTemplate() {  // клонировать по '#add-card-template'
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
   
    return cardElement;
    }

    _handlerLikeIcon = (evt) => {       // реакция на лайк внутри карточки
        this._handleLikeClick();
        console.log(this._likes);

        if (this._cardIsLike) {  // если стоял лайк юзера, снимаем его
          api.removeLikeFromServer(this._cardId)
          .then(console.log('лайк снят'));
          evt.target.classList.add('card__like_active');
          this._cardIsLike = false; 
        }
        else {                    // если лайка не было, ставим
          evt.target.classList.remove('card__like_active');
          api.setLikeToServer(this._cardId)
          .then(console.log('лайк поставлен'));
          this._cardIsLike = true;  
        }
       evt.target.classList.toggle('card__like_active');
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
   

    generateCard() {  // публичный метод с наполнением карточки
      this._element = this._getTemplate(); // вызов клона шаблона
      const imageOfCard = this._element.querySelector('.card__image');
      imageOfCard.src = this._image;
      imageOfCard.alt = this._text;
      this._element.querySelector('.card__name').textContent = this._text;
      this._element.querySelector('.counter').textContent = this._likes.length;
      this._setEventListeners();
      return this._element;
    }
}