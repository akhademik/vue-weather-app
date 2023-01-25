import axios from 'axios';

const APIKEY = '223ff7593054c8e5f66efe8a0972112b';

const getCityWeather = async (lat, lon) => {
  const baseURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIKEY}&units=metric`;
  try {
    const result = await axios.get(baseURL);
    const data = await result;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getCityWeather;
