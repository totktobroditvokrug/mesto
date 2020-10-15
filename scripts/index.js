

// popup юзера
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

/*
// popup места
let buttonOpenPopupPlace = document.querySelector('.button_type_edit');
let buttonClosePopupPlace = document.querySelector('.button_type_close');
let popup = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name');  
let jobProfile = document.querySelector('.profile__job');
*/
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

function addPlace() {
    console.log('сохранить место');
}

buttonAddPlace.addEventListener("click", addPlace);

//----- инициализация карточек ----
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
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__name').textContent = name;
    return card;
};

const elements = initialCards.map(function (element) {  // инициализируе6м карточки
    return getItems(element.name, element.link);
    
});

const placeList = document.querySelector('.cards'); // начало контейнера для мест
 // console.log(elements[1]);

 elements.forEach((item) => placeList.append(item));

/*
const TODO_LIST = [
    {title: 'Посмотреть вебинар 🎥'},
    {title: 'Посмотреть вопросы с собеседований 👔'},
    {title: 'Покормить кота 😸'},
    {title: 'Поработать над своим сайтом 👨‍💻'},
    {title: 'Прогуляться в парке 🌳'},
];

const list = document.querySelector('.todo__list');
const addButton = document.querySelector('.button_add');
const input = document.querySelector('.input');
const template = document.querySelector('.template');

const renderList = () => {
    const items = TODO_LIST.map(element => getItems(element));

    // spread -> const array [1, 2, 3] ...
    // ...array -> 1, 2, 3
    list.append(...items)
};

const handlerRemove = (event) => {
    event.target.closest('.card').remove();
};

const handlerDuplicate = (event) => {
    const cardTitle = event.target.closest('.card').querySelector('.card__title').innerHTML;

    const item = getItems({
        title: cardTitle
    });

    list.prepend(item);
};

const getItems = (data) => {
    const card = template.content.cloneNode(true);
    card.querySelector('.card__title').innerText = data.title;

    const duplicateButton = card.querySelector('.button_duplicate');
    const removeButton = card.querySelector('.button_remove');

    // console.log({ duplicateButton, removeButton });

    removeButton.addEventListener('click', handlerRemove);
    duplicateButton.addEventListener('click', handlerDuplicate);

    return card;
};

const bindHandlers = () => {
    addButton.addEventListener('click', () => {
        const item = getItems({
            title: input.value
        });

        list.prepend(item);

        input.value = '';
    });
};

renderList();
bindHandlers();


// Это пример template-строк
const someConst = 'Иванов';
// const name = "Егор" + '' + someConst;
const name = `Егор ${someConst}`;
// name Егор Иванов




// const functionName = () => {
//   return;
// }

// const functionName = () => console.log('+');

// function functionName() {
    
// }
*/