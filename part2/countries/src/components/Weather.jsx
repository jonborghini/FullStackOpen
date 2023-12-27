
const Weather = ({countriesToShow, cityWeather}) => {
    if (countriesToShow.length !== 1 || !cityWeather || !cityWeather.main) {
      return null
    } else {
      const capital = countriesToShow[0].name.common
      const temperature = cityWeather.main.temp
      const wind = cityWeather.wind.speed
      const icon = cityWeather.weather[0].icon
      return (
        <div>
          <h2>Weather in {capital}</h2>
          <div>temperature: {temperature} Celsius</div>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
          <div>wind {wind} m/s</div>
        </div>
      )
    }
}

export default Weather