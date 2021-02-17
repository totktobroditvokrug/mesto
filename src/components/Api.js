
export class Api {
    constructor(config) {
      this._url = config.baseUrl;
      this._headers = config.headers;
    }

    getInitialCards(cardUrl) {  // получить массив карточек с сервера
        return fetch(this._url + cardUrl, {
            method: "GET",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка запроса карточек: ${res.status}`);
          });
    }

    setNewCard(cardUrl, data) { // закинуть новую карточку на сервер
      return fetch(this._url + cardUrl, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(
            data  // объект {name: '', link: ''}
            )
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка записи карточки: ${res.status}`);
      });
    }

    getUserInfo(userUrl) {
        return fetch(this._url + userUrl, {
            method: "GET",
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка запроса юзера: ${res.status}`);
          });
    }

    setUserInfo(userUrl, data) {
        return fetch(this._url + userUrl, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(
                data
                )
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка записи юзера: ${res.status}`);
          });

    }
    // другие методы работы с API
}
