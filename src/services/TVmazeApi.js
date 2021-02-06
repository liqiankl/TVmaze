import Axios from 'axios';
const API_KEY = 'US';
const BASE_URL = ` http://api.tvmaze.com/schedule/web?date=2020-05-29&country=${API_KEY}`;

export async function searchShows(searchText) {
  try {
    const response = await Axios.get(`${BASE_URL}&s=${searchText}`);
    if (response.status === 200) {
      let data = response.data;
      if (data.Response === 'True') {
        return data.Search;
      }
    } else {
      alert('API Error 1');
      return [];
    }
  } catch (error) {
    alert('API Error');
    return [];
  }
}

export async function getShowByID(id) {
  try {
    const response = await Axios.get(`${BASE_URL}&i=${id}`);
    if (response.status === 200) {
      let data = response.data;
      if (data.Response === 'True') {
        return data;
      }
    } else {
      alert('API Error 1');
      return {};
    }
  } catch (error) {
    alert('API Error');
    return {};
  }
}
