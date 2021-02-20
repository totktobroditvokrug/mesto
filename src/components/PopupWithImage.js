import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor( popupSelector) {
      super(popupSelector);
      this._imageTitle = this._popup.querySelector('.signature_dark');
      this._image = this._popup.querySelector('.photo');
    }

    openPopup({link, title}) {
      this._image.src = link; 
      this._imageTitle.textContent = title;
      this._image.alt = title;
      super.openPopup();
    }

}