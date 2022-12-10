export const BASE_URL =
  'https://api.ajp.movies.explorer.nomoredomains.icu';

const baseUrlForImage = 'https://api.nomoreparties.co';

const getToken = () => localStorage.getItem('token');

const checkResponse = res => {
  if (res) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
    }),
  }).then(res => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'password': password, 'email': email }),
  }).then(res => checkResponse(res));
};

export const getContent = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(res => checkResponse(res));
};

export const updateProfile = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ 'name': name, 'email': email }),
  }).then(res => checkResponse(res));
};

export const addToFavorite = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  id,
  nameRU,
  nameEN,
}) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      'country': country,
      'director': director,
      'duration': duration,
      'year': year,
      'description': description,
      'image': baseUrlForImage + image.url,
      'trailerLink': trailerLink,
      'thumbnail': baseUrlForImage + image.url,
      'movieId': id,
      'nameRU': nameRU,
      'nameEN': nameEN,
    }),
  }).then(res => checkResponse(res));
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
  }).then(res => checkResponse(res));
};

export const deleteFromFavorite = movieId => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
  }).then(res => checkResponse(res));
};
