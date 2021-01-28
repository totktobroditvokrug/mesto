//---------------- карточки ООП -----------------
import { formViewImage ,buttonCloseViewImage , viewImageTitle, viewImageLink } from './index.js'
import { openPopup } from './index.js'

 //---------------- инициализация карточек ----------------
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export class Card {
	constructor(data, cardSelector) {
		this._text = data.name;
		this._image = data.link;
		this._cardSelector = cardSelector;
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
   
    _handlerPreviewPicture() {            // просмотр фото
        viewImageLink.src = this._image; 
        viewImageTitle.textContent = this._text; 
        viewImageLink.alt = this._text;
        openPopup(formViewImage);
    }

    _setEventListeners() {  // слушатели кнопок
        this._element.querySelector('.button_type_like').addEventListener('click', this._handlerLikeIcon);
        this._element.querySelector('.button_type_trash').addEventListener('click', this._handlerDeleteCard);
        this._element.querySelector('.card__image').addEventListener('click', () => this._handlerPreviewPicture());
    }
   

    generateCard() {  // публичный метод с наполнением карточки
      this._element = this._getTemplate(); // вызов клона шаблона

      this._element.querySelector('.card__image').src = this._image;
      this._element.querySelector('.card__image').alt = this._text;
      this._element.querySelector('.card__name').textContent = this._text;
      this._setEventListeners();
      return this._element;
    }
}