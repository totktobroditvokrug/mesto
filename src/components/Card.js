//---------------- карточки ООП -----------------
import { api } from '../pages/index.js'
export class Card {
	constructor({ data, handleCardClick, deleteCardCallback, updateCardView}, cardSelector) {
    this._data = data;
    
		this._text = data.name;
		this._image = data.link;
    this._likes = data.likes;
    this._cardId = data.cardId; // идентификатор изображения с сервера
    this._userId = data.userId;    // идентификатор юзера
    this._handleCardClick = handleCardClick; // функция вызова просмотра карточки
    this._deleteCardCallback = deleteCardCallback;  // функция удаления карточки
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
      const myServerId = "f87caedede5ba1f17713b304";
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
              api.removeLikeFromServer(this._cardId)  // запрос на сервер по идентификатору карточки
              .then((result) => {
                 this._likes = result.likes;  // обновить состояние карточек
                 console.log('лайк снят');
                 objectLike.textContent = result.likes.length;
           //      return result;
              })
              .catch((result) => {
                  console.log('лайк не снялся');
                }); 
            }
            else {                    // если лайка не было, ставим
              evt.target.classList.add('card__like_active');
              api.setLikeToServer(this._cardId)
              .then((result) => {
                this._likes = result.likes;  // обновить состояние карточек
                console.log('лайк поставлен');
                objectLike.textContent = result.likes.length;
         //       return result;
              })
              .catch((result) => {
                console.log('лайк не залетел');
              })
            }
    }


    _handleDeleteCard = (evt) => {
  //    console.log('удаление своей карточки');
  //    console.log(evt.target.tagName);
      this._deleteCardCallback(this._cardId, evt);
                      // удаление карточки
   //         evt.target.closest('.card').remove();

    }

   
    _setEventListeners() {  // слушатели кнопок
      const myServerId = "f87caedede5ba1f17713b304";
   //   console.log('номер автора карточки')
   //   console.log(this._userId);
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