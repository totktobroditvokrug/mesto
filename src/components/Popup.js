export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);;
      this._popupOpen = 'popup_on';
      this._closeButton = this._popup.querySelector('.button_type_close');
  }
  
  openPopup() {
    this._popup.classList.add(this._popupOpen);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  };

  closePopup() {
    this._popup.classList.remove(this._popupOpen);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);  
  }

  _handleOverlayClose = (evt) => {
    if(evt.target === evt.currentTarget){
      this.closePopup();  // закрываем текущую форму по клику вне его
    }
  }
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.closePopup();
      }  
  }

  setEventListeners() {  // слушатель клика закрытия
    this._closeButton.addEventListener('click', this.closePopup.bind(this));
  };
}
