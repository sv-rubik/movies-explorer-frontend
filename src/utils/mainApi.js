class MainApi {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

//to avoid double-coding in methods below
  _handleServerResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`There is following server error: ${res.status}`)
    }
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  sendUserData(profileInputsData) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        name: profileInputsData.name,
        email: profileInputsData.email,
        })
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  saveMovie({ ...data }) {
    return fetch(`${this._url}movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({...data})
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  getSavedMovies() {
    return fetch(`${this._url}movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(res => {return this._handleServerResponse(res)})
  }
}

////// TODO
export const mainApi = new MainApi({
  baseUrl: 'https://api.sv-rubik-diploma.nomoredomainsrocks.ru/',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${ localStorage.getItem('token') }`,
  }
})
