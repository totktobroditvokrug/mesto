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