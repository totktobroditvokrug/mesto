import { myServerId, userUrl, cardUrl, avatarUrl, likesUrl } from '../utils/constants.js'

export class Api {
    constructor(config) {
      this._url = config.baseUrl;
      this._headers = config.headers;
    }

    getInitialCards() {  // получить массив карточек с сервера
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

    setNewCard(data) { // закинуть новую карточку на сервер
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

    deleteCard(cardId) {   // удаление карточки
      return fetch(this._url + cardUrl + '/' + cardId, {
        method: "DELETE",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка удаления карточки: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    getUserInfo() {  // вернет юзера с сервера
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

    setUserInfo(data) {  // закинет юзера на сервер
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
          })
          .catch((err) => {
            console.log(err);
          });
    }

    setAvatar(data) {  // закинет аватар на сервер
      return fetch(this._url + avatarUrl, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify(
            {
                "avatar": data
            }
            )
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка записи аватара: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
  }

    //------------- работа с лайками
    setLikeToServer(cardId) {   
      return fetch(this._url + likesUrl + cardId, {
        method: "PUT",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка записи лайка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    removeLikeFromServer(cardId) {   
      return fetch(this._url + likesUrl + cardId, {
        method: "DELETE",
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка снятия лайка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
}
