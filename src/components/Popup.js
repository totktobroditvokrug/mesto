export class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._popupOpen = 'popup_on';
      this._closeButton = popupSelector.querySelector('.button_type_close');
  }
  
  openPopup() {
    
    this._popupSelector.classList.add(this._popupOpen);
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._closeButton.addEventListener('click', this.closePopup.bind(this)); // перенес из  setEventListeners()
  };

  closePopup() {
    
    this._popupSelector.classList.remove(this._popupOpen);
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupSelector.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
    
  };

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
  //  this._closeButton.addEventListener('click', this.closePopup.bind(this));  // по заданию должно быть здесь
    
  };
}


export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__container');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  _methodSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.closePopup();
  };

  setEventListeners() {
    super.setEventListeners();
     
    this._popupSelector.addEventListener('submit', this._methodSubmit);
  }

  closePopup() {
    this._popupSelector.removeEventListener('submit', this._methodSubmit);
    this._popupSelector.reset();
    super.closePopup();
  }
}

export class PopupWithImage extends Popup {
  constructor( popupSelector, {link, title} ) {
    super(popupSelector);
    this._imageTitle = popupSelector.querySelector('.signature_dark');
    this._image = popupSelector.querySelector('.photo');
    this._closeButton = popupSelector.querySelector('.button_type_close2');
    this._src = link; 
    this._title = title;
  }
  openPopup() {

    this._image.src = this._src; 
    this._imageTitle.textContent = this._title;
    this._image.alt = this._title;
    super.openPopup();
  }
  setEventListeners() {  // слушатель клика закрытия
    
 //   this._closeButton.addEventListener('click', this.closePopup.bind(this));  // проверить потерю контекста
  };
}


