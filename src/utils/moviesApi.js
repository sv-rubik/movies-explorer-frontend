class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`There is following server error: ${res.status}`)
    }
  }

  getInitialMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {return this._handleServerResponse(res)})
  }

}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies/',
  headers: {
    'Content-Type': 'application/json',
  }
})
