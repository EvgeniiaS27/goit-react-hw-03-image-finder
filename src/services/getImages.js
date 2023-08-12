const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37793380-846502e5eebe78c5507a83779';

export const getImages = (query, page) => {
  return fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
