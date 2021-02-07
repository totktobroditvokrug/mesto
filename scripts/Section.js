export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._initialCards = items;
      this._renderer = renderer; 
      
      this._container = document.querySelector(containerSelector);
    }
  
    renderItems() {
      this._initialCards.forEach((item) => {
        this._renderer(item)
      }); // заливаем инициализированные карточки на страницу
    }
  
    addItem(element) {
      this._container.append(element);
    }
  }