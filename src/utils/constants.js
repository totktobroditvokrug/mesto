 // колдовство с картинками для webpack
 const arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
 const chelyabinsk = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
 const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
 const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
 const kholmogorsky = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
 const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');

//---------------- инициализация карточек ----------------
 export const initialCards = [
    {
        name: 'Архыз',
        link: arkhyz
    },
    {
        name: 'Челябинская область',
        link: chelyabinsk
    },
    {
        name: 'Иваново',
        link: ivanovo
    },
    {
        name: 'Камчатка',
        link: kamchatka
    },
    {
        name: 'Холмогорский район',
        link: kholmogorsky
    },
    {
        name: 'Байкал',
        link: baikal
    }
];


// объявляем объект со стилями форм для валидации отдельно без вызова функции
export const elementsForValidation = {
    formSelector: '.popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    formIsActive: 'popup_on'
};

// константы для работы с сервером
export const myServerId = "f87caedede5ba1f17713b304";
export const userUrl = 'users/me';
export const cardUrl = 'cards';
export const avatarUrl = userUrl + '/avatar';
export const likesUrl = 'cards/likes/';  // адрес карточки без idCard

