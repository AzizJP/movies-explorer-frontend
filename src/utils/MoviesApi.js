export const BASE_URL =
  'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = res => {
  if (res) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getContent = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => checkResponse(res));
};
