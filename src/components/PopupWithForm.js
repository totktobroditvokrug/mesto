import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.popup__container');
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
       
      this._popup.addEventListener('submit', this._methodSubmit);
    }
  
    closePopup() {
//      this._popup.removeEventListener('submit', this._methodSubmit); // костыль против многократной отправки формы
      this._popup.reset();
      super.closePopup();
    }
  }