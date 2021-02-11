//---------------- карточки ООП -----------------

export class Card {
	constructor({ data, handleCardClick }, cardSelector) {
		this._text = data.name;
		this._image = data.link;
    this._handleCardClick = handleCardClick; // функция вызова просмотра карточки
		this._cardSelector = cardSelector;
    this._dataPreview = {
      link: this._image,
      title: this._text
    }
	}

	_getTemplate() {  // клонировать по '#add-card-template'
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
   
    return cardElement;
    }
    
    _handlerLikeIcon = (evt) => {                      // реакция на лайк внутри карточки
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
      this._setEventListeners();
      return this._element;
    }
}