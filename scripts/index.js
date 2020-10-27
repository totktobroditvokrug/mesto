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




function openPopup(form) {   // открывальщик всех форм
    enableValidation(elementsForValidation);  // передаем на валидацию весь объект со стилями формы
    form.classList.add('popup_on');
}

function closePopup(form) {  // закрывальщик всех форм
    form.classList.remove('popup_on');
}

function editPopupProfile() {   // 
    nameInput.value = nameProfile.textContent;  // подгружаем значения профиля
    jobInput.value = jobProfile.textContent;
    openPopup(profileFormElement);
}

const onClickPopupLayout = (evt) => {
    if(evt.target !== evt.currentTarget){
    return;
    }
    closePopup(evt.currentTarget);  // закрываем текущую форму по клику вне его
}

popupAreas.forEach((area) => {
    console.log(area);
    area.addEventListener('mousedown', onClickPopupLayout);
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(area);  //  закрытие текущего попапа по эскейпу
        }     
    });
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

function getItems(name, link) {  // заполнить карточку по template
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
    openPopup(formViewImage);
}

const elements = initialCards.map(function (element) {  // инициализируем карточки
    return getItems(element.name, element.link);  
});

elements.forEach((item) => placeList.append(item)); // заливаем инициализированные карточки на страницу


buttonOpenPopupAddPlace.addEventListener("click", () => openPopup(addPlaceFormElement));
buttonClosePopupAddPlace.addEventListener("click", () =>  closePopup(addPlaceFormElement));

function addPlace(evt) {
    evt.preventDefault(); 

    placeList.prepend(getItems(namePlace.value, linkPlace.value)); // добавить новую карточку по кнопке Создать
    addPlaceFormElement.reset();
    closePopup(addPlaceFormElement);
}

addPlaceFormElement.addEventListener("submit", addPlace);

buttonCloseViewImage.addEventListener("click", () => closePopup(formViewImage));