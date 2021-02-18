//---------------- карточки ООП -----------------
// import { api } from '../pages/index.js'
export class Card {

	constructor({ data, handleCardClick, handleLikeClick}, cardSelector) {
    this._data = data;
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
        this._handleLikeClick(this._data, evt);
        console.log('колбэк лайка прошел');
    //    console.log(this.querySelector('.counter').textContent);
    //    this._element.querySelector('.counter').textContent = this._likes.length;
      // = this._likes.length;
    }

    _handlerDeleteCard = (evt) => {                    // удаление карточки
            evt.target.closest('.card').remove();
    }

   
    _setEventListeners() {  // слушатели кнопок
        this._element.querySelector('.like-area').addEventListener('click', this._handlerLikeIcon);
        this._element.querySelector('.button_type_trash').addEventListener('click', this._handlerDeleteCard);
        this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleCardClick(this._dataPreview);
        });
      //this._element.querySelector('.card__image').addEventListener('click', console.log('как-то вызвать просмотрщик'));
    }
   
    _refrechLike(element, myServerId) {
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
      this._refrechLike(this._element, myServerId);  // инициализация лайков
      this._setEventListeners();
      return this._element;
    }
}