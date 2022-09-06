const axios = require('axios').default;

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myKey = '28400374-5eacf081d2efacca1adf31c1f';

async function getData(searchName, page) {
  const responce = await axios.get('', {
    params: {
      key: myKey,
      q: searchName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: page,
    },
  });
  return responce.data;
}

export default getData;
