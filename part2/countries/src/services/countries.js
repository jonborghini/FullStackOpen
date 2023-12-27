import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_SOME_KEY


const getAll = () => { 
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getCountry = () => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
  const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)
}

export default { 
  getAll, getCountry, getWeather
}

