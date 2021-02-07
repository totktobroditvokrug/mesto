/*

export class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
  }
  
  open() {
    this._popupSelector.classList.add('popup_on');
    document.addEventListener('keydown', this._handleEscClose);
  };
  close() {
    this._popupSelector.classList.remove('popup_on');
    document.removeEventListener('keydown', this._handleEscClose);
  };
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.close();
      }  
  }
  setEventListeners() {  // слушатель клика закрытия

  };
}

export class PopupWithImage extends Popup {
  constructor(popup, image, imageName) {
    super(popup);
    this._image = this.popup.querySelector(image);
    this._imageName = this.popup.querySelector(imageName);
  }
  open(name, link)   {
    this._imageName.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}

/*
function  closePopupOnEscape (evt){  // закрытие активного попапа по Escape
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_on'));
    }     
}
*/
/*
export function openPopup(form) {   // открывальщик всех форм
    form.classList.add('popup_on');
    document.addEventListener('keydown', closePopupOnEscape);
}
*/
/*
function closePopup(form) {  // закрывальщик всех форм
    form.classList.remove('popup_on');
    document.removeEventListener('keydown', closePopupOnEscape);
}

const onClickPopupLayout = (evt) => {
    if(evt.target === evt.currentTarget){
      closePopup(evt.currentTarget);  // закрываем текущую форму по клику вне его
    }
}
*/