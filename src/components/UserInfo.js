export class UserInfo {
    constructor(elementJob, elementName) {
        this._elementJob = elementJob;  // ячейки имени-работы
        this._elementName = elementName;
    }

    getUserInfo() {
        return {
            userProfileJob:  this._elementJob.textContent,  // подгружаем значения профиля
            userProfileName: this._elementName.textContent
        };
    }
    setUserInfo({newElementJob, newElementName}) {  // записать в ячейки страницы новые данные
        this._elementJob.textContent = newElementJob;
        this._elementName.textContent = newElementName;
    }
}