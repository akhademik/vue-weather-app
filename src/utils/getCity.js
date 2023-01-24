import axios from 'axios';

const APIKEY =
  'pk.eyJ1IjoiYWtoYWRlbWlrIiwiYSI6ImNsZDdhenl1bjB0MnEzcW1tazE0Mzc5dnAifQ.fNY2SjsS7hnUvP-n9x_sqg';

const getCity = async searchQuery => {
  const baseURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${APIKEY}`;
  const result = await axios.get(baseURL);
  const data = await result.data.features;
  return data;
};

export default getCity;
