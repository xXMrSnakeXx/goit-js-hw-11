import axios from 'axios';

export async function fetchImages(name, page) {
  const BASE_URL = `https://pixabay.com/api/`;
  const KEY = `25724186-ef6039769df87abd937d53a4a`;
  const options = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

  try {
    const resolve = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&${options}&page=${page}`);
    return resolve.data;
  } catch (error) {
    console.log(error);
  }
}
