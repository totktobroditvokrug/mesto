const popupAreas =  Array.from(document.querySelectorAll('.popup')); // массив полей попапа

// ---------------  popup редактирования юзера  -----------------
const nameProfile = document.querySelector('.profile__name');  
const jobProfile = document.querySelector('.profile__job');
const profileFormElement = document.querySelector('#user-information');  // находим форму юзера
const nameInput = profileFormElement.querySelector('#user-name'); // поле имени юзера
const jobInput = profileFormElement.querySelector('#user-job');   // поле деятельности юзера
const buttonOpenPopupProfile = document.querySelector('.button_type_edit');
const buttonClosePopupProfile = profileFormElement.querySelector('.button_type_close');

//---------------- popup добавления места ----------------
const buttonOpenPopupAddPlace = document.querySelector('.button_type_add');
const addPlaceFormElement = document.querySelector('#place-add');  // находим форму
const namePlace = addPlaceFormElement.querySelector('#place-name'); // название места
const linkPlace = addPlaceFormElement.querySelector('#place-link');   // ссылка на изображение места
const buttonClosePopupAddPlace = addPlaceFormElement.querySelector('.button_type_close');
const buttonAddPlace = addPlaceFormElement.querySelector('#button-add-place');
const placeList = document.querySelector('.cards'); // начало контейнера для карточек

//---------------- popup просмотра фотографий ----------------
const formViewImage = document.querySelector('#view-image');  // находим блок просмотра фотографии
const buttonCloseViewImage = formViewImage.querySelector('.button_type_close2');
const viewImageTitle = formViewImage.querySelector('.card__name_dark');
const viewImageLink = formViewImage.querySelector('.photo');

const addCardTemplate = document.querySelector('#add-card-template');  // поиск шаблона

function  closePopupOnEscape (evt){  // закрытие активного попапа по Escape
    if (evt.key === 'Escape') {
      document.querySelector('.popup_on');
        closePopup(document.querySelector('.popup_on'));
    }     
}

function openPopup(elementsForValidation, form) {   // открывальщик всех форм
    resetTextErrors(form);  // сброс повторно открытых окон, закрытых до этого с ошибкой
    addPlaceFormElement.reset();
    if (checkButtonInForm(elementsForValidation, form)){
        const buttonElement = form.querySelector(elementsForValidation.submitButtonSelector);
        buttonElement.classList.add('button_type_inactive');
        buttonElement.disabled = true;
    }
   
    form.classList.add('popup_on');
    document.addEventListener('keydown', closePopupOnEscape);
}

function closePopup(form) {  // закрывальщик всех форм
    form.classList.remove('popup_on');
    document.removeEventListener('keydown', closePopupOnEscape);
}

function editPopupProfile() {   // 
    nameInput.value = nameProfile.textContent;  // подгружаем значения профиля
    jobInput.value = jobProfile.textContent;
    openPopup(elementsForValidation, profileFormElement);
}

const onClickPopupLayout = (evt) => {
    if(evt.target !== evt.currentTarget){
    return;
    }
    closePopup(evt.currentTarget);  // закрываем текущую форму по клику вне его
}

popupAreas.forEach((area) => {  // каждому попапу слушатель мышки
    area.addEventListener('mousedown', onClickPopupLayout);
});


buttonOpenPopupProfile.addEventListener("click", () =>  editPopupProfile());
buttonClosePopupProfile.addEventListener("click", () =>  closePopup(profileFormElement));

function submitProfile (evt) {   // заполнение формы профиля без отправки
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profileFormElement);
}

profileFormElement.addEventListener('submit', submitProfile);  // реагирует на enter без дополнительного кода

function createCard(name, link) {  // заполнить карточку по template
    const card = addCardTemplate.content.cloneNode(true);  // клонируем текущую карточку
    const cardImage = card.querySelector('.card__image');
    const buttonCardLike = card.querySelector('.button_type_like');  // кнопка лайка
    const buttonCardTrash = card.querySelector('.button_type_trash');  // кнопка удаления карточки

    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__name').textContent = name; 

    buttonCardLike.addEventListener('click', handlerLikeIcon);
    buttonCardTrash.addEventListener('click', handlerDeleteCard);
    cardImage.addEventListener('click', () => handlerPreviewPicture(name, link));
    return card;
};

const handlerLikeIcon = (evt) => {                      // реакция на лайк внутри карточки
    evt.target.classList.toggle('card__like_active');
    }

const handlerDeleteCard = (evt) => {                    // удаление карточки
        evt.target.closest('.card').remove();
}

function handlerPreviewPicture(name, link) {            // просмотр фото
    viewImageLink.src = link; 
    viewImageTitle.textContent = name; 
    viewImageLink.alt = name;
    openPopup(elementsForValidation, formViewImage);
}

const elements = initialCards.map(function (element) {  // инициализируем карточки
    return createCard(element.name, element.link);  
});

elements.forEach((item) => placeList.append(item)); // заливаем инициализированные карточки на страницу


buttonOpenPopupAddPlace.addEventListener("click", () => openPopup(elementsForValidation, addPlaceFormElement));
buttonClosePopupAddPlace.addEventListener("click", () =>  closePopup(addPlaceFormElement));

function addPlace(evt) {
    evt.preventDefault(); 

    placeList.prepend(createCard(namePlace.value, linkPlace.value)); // добавить новую карточку по кнопке Создать
    addPlaceFormElement.reset();
    closePopup(addPlaceFormElement);
}

addPlaceFormElement.addEventListener("submit", addPlace);

buttonCloseViewImage.addEventListener("click", () => closePopup(formViewImage));