import { useState, useEffect } from 'react'
import infoCountries from './services/countries'
import Filter from './components/Filter'
import Weather from './components/Weather'
import CountryList from './components/Country'

const App = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [cityWeather, setCityWeather] = useState(null)
  const [lastFetchedCountry, setLastFetchedCountry] = useState(null);


  const countriesToShow = search === ''
  ? []
  : countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase()))


  useEffect(() => {
    infoCountries
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0].name.common;

      if (lastFetchedCountry !== country) {
        const lat = countriesToShow[0].capitalInfo.latlng[0]
        const lon = countriesToShow[0].capitalInfo.latlng[1]
        weatherInfo({lat, lon})

        setLastFetchedCountry(country)
      }
    }
  }, [countriesToShow])

  const weatherInfo = ({lat, lon}) => {
    console.log('weatherInfo', lat, lon)
    infoCountries
      .getWeather(lat, lon)
      .then(weather => {
        setCityWeather(weather)
      })
  }

  const handleShowClick = (name) => {setSearch(name)}
  const handleSearchChange = (event) => {setSearch(event.target.value)}

  return (
    <div>
      <Filter value={search} handleChange={handleSearchChange} />
      <CountryList countriesToShow={countriesToShow} handleShowClick={handleShowClick} />
      <Weather countriesToShow={countriesToShow} cityWeather={cityWeather} />
    </div>
  )
}

export default App