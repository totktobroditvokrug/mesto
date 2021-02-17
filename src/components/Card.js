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
    //    this._element.querySelector('.counter').textContent = this._likes.length;
      // = this._likes.length;
    }

    //     if (this._cardIsLike) {  // если стоял лайк юзера, снимаем его
    //       api.removeLikeFromServer(this._cardId)
    //       .then(console.log('лайк снят'));
    //       evt.target.classList.add('card__like_active');
    //       this._cardIsLike = false; 
    //     }
    //     else {                    // если лайка не было, ставим
    //       evt.target.classList.remove('card__like_active');
    //       api.setLikeToServer(this._cardId)
    //       .then(console.log('лайк поставлен'));
    //       this._cardIsLike = true;  
    //     }
    //    evt.target.classList.toggle('card__like_active');
    // }
    
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
   
    refrechLike() {
      
    }
    generateCard(myServerId) {  // публичный метод с наполнением карточки
      this._element = this._getTemplate(); // вызов клона шаблона
      const imageOfCard = this._element.querySelector('.card__image');
      imageOfCard.src = this._image;
      imageOfCard.alt = this._text;
      this._element.querySelector('.card__name').textContent = this._text;
      this._element.querySelector('.counter').textContent = this._likes.length;
      let cardIsLike = false; // ставим первоначально отсутствие лайка  
      this._likes.forEach((item) => {
        console.log(item);
        if (item._id === myServerId) {
          console.log('это лайк юзера');
          cardIsLike = true;
          this._element.querySelector('.card__like').classList.add('card__like_active');
        }
        else {
          console.log('тут нет лайка юзера');
          cardIsLike = false;
        }
      });
      this._setEventListeners();
      return this._element;
    }
}