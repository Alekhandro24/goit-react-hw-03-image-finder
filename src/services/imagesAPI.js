import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const config = {
  params: {
    key: '32183199-31e068f74aac547d11d265b40',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

async function searchImages(query, page = 1) {
  const urlAXIOS = `?page=${page}&q=${query}`;
  const { data } = await axios.get(urlAXIOS, config);
  return data;
}

const api = {
  searchImages,
};

export default api;


// const API_KEY = '32183199-31e068f74aac547d11d265b40';
