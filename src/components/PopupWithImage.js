import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor( popupSelector) {
      super(popupSelector);
      this._imageTitle = this._popup.querySelector('.signature_dark');
      this._image = this._popup.querySelector('.photo');
      this._closeButton2 = this._popup.querySelector('.button_type_close2');
    }

    openPopup({link, title}) {
      this._image.src = link; 
      this._imageTitle.textContent = title;
      this._image.alt = title;
      super.openPopup();
    }
    setEventListeners() {  // перезаписать для иного стиля кнопки закрытия
      this._closeButton2.addEventListener('click', this.closePopup.bind(this));  // проверить потерю контекста
    };
  }