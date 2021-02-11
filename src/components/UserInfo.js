// ---------------  popup редактирования юзера  -----------------
export const nameProfile = document.querySelector('.profile__name');  
export const jobProfile = document.querySelector('.profile__job');
export const profileFormElement = document.querySelector('#user-information');  // находим форму юзера
export const nameInput = profileFormElement.querySelector('#user-name'); // поле имени юзера
export const jobInput = profileFormElement.querySelector('#user-job');   // поле деятельности юзера
export const buttonOpenPopupProfile = document.querySelector('.button_type_edit');
const buttonClosePopupProfile = profileFormElement.querySelector('.button_type_close');
export const buttonSubmitUser = profileFormElement.querySelector('.button_type_save');

export class UserInfo {
    constructor(elementJob, elementName) {
        this._elementJob = elementJob;  // ячейки имени-работы
        this._elementName = elementName;
    }

    getUserInfo() {
        console.log('получить данные юзера');
        return {
            userProfileJob:  this._elementJob.textContent,  // подгружаем значения профиля
            userProfileName: this._elementName.textContent
        };
    }
    setUserInfo({newElementJob, newElementName}) {
        this._elementJob.textContent = newElementJob;
        this._elementName.textContent = newElementName;
    }
}

/*
    nameInput.value = nameProfile.textContent;  // подгружаем значения профиля
    jobInput.value = jobProfile.textContent;
*/