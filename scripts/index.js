

// ---------------  popup редактирования юзера  -----------------
let nameProfile = document.querySelector('.profile__name');  
let jobProfile = document.querySelector('.profile__job');

let formElement = document.querySelector('#user-information');  // находим форму
let nameInput = formElement.querySelector('#user-name'); // поле имени
let jobInput = formElement.querySelector('#user-job');   // поле деятельности
let buttonOpenPopup = document.querySelector('.button_type_edit');
let buttonClosePopup = formElement.querySelector('.button_type_close');

function popupOpen() {
    nameInput.value = nameProfile.textContent;  // подгружаем значения профиля
    jobInput.value = jobProfile.textContent;
    formElement.classList.add('popup_on');
}

function popupClose() {
    formElement.classList.remove('popup_on');
}

buttonOpenPopup.addEventListener("click", popupOpen);
buttonClosePopup.addEventListener("click", popupClose);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    console.log('функция отправки формы');
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);  // реагирует на enter без дополнительного кода
// ---------------


//---------------- инициализация карточек ----------------
const initialCards = [
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


const addCardTemplate = document.querySelector('#add-card-template');  // поиск шаблона

function getItems(name, link) {  // заполнить карточку по template
    const card = addCardTemplate.content.cloneNode(true);  // клонируем текущую карточку
    const cardImage = card.querySelector('.card__image');
    const buttonCardLike = card.querySelector('.button_type_like');  // кнопка лайка
    const buttonCardTrash = card.querySelector('.button_type_trash');  // кнопка удаления карточки

    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__name').textContent = name; 
    buttonCardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
    // console.log('лайк карточке' + evt.target.classList);
    });

    buttonCardTrash.addEventListener('click', function (evt) {
            evt.target.closest('.card').remove();
    });


    cardImage.addEventListener('click', function (evt) {
        ViewImageLink.src = link;
        ViewImageTitle.textContent = name;
        popupOpenViewImage();
    //    console.log('клик по карточке' + ViewImageLink, ViewImageTitle);
    });
    return card;
};

const elements = initialCards.map(function (element) {  // инициализируем карточки
    return getItems(element.name, element.link);
    
});

const placeList = document.querySelector('.cards'); // начало контейнера для карточек

elements.forEach((item) => placeList.append(item)); // заливаем инициализированные карточки на страницу
// ---------------

//---------------- popup добавления места ----------------

const buttonOpenPopupAddPlace = document.querySelector('.button_type_add');
const formElementAddPlace = document.querySelector('#place-add');  // находим форму
const namePlace = formElementAddPlace.querySelector('#place-name'); // название места
const linkPlace = formElementAddPlace.querySelector('#place-link');   // ссылка на изображение места
const buttonClosePopupAddPlace = formElementAddPlace.querySelector('.button_type_close');
const buttonAddPlace = formElementAddPlace.querySelector('#button-add-place');
function popupOpenAddPlace() {
    formElementAddPlace.classList.add('popup_on');
}

function popupCloseAddPlace() {
    formElementAddPlace.classList.remove('popup_on');
}

buttonOpenPopupAddPlace.addEventListener("click", popupOpenAddPlace);
buttonClosePopupAddPlace.addEventListener("click", popupCloseAddPlace);

function addPlace(evt) {
    evt.preventDefault(); 

    if (namePlace.value !== '' && linkPlace.value !== '' &&  !linkPlace.value.includes('<', '>') && !namePlace.value.includes('<', '>')) {
        placeList.prepend(getItems(namePlace.value, linkPlace.value)); // добавить новую карточку по кнопке Создать
        console.log('сохранить место');
    }
    namePlace.value = '';  // сбросить поля формы
    linkPlace.value = '';
    popupCloseAddPlace();
}

formElementAddPlace.addEventListener("submit", addPlace);
// ---------------

//---------------- popup просмотра фотографий ----------------
const formViewImage = document.querySelector('#view-image');  // находим блок просмотра фотографии
const buttonCloseViewImage = formViewImage.querySelector('.button_type_close2');
const ViewImageTitle = formViewImage.querySelector('.card__name_dark');
const ViewImageLink = formViewImage.querySelector('.photo');

function popupOpenViewImage() {
    formViewImage.classList.add('popup_on');
}

function popupCloseViewImage() {
    formViewImage.classList.remove('popup_on');
}

buttonCloseViewImage.addEventListener("click", popupCloseViewImage);
// ---------------
