import Button from './Button'

const CountryDetails = ({countriesToShow}) => {
    return (
      <div>
        {countriesToShow.map(country => 
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
              {Object.values(country.languages).map(language => 
                <li key={language}>{language}</li>
              )}
            </ul>
            <img src={country.flags.png} alt="Flag" height="100" />
          </div>
        )}
      </div>
    )
  }
  
const CountryPart = ({countriesToShow, handleShowClick}) => {
return (
    countriesToShow.map(country => 
    <div key={country.name.common}>
        {country.name.common}
        <Button text='show' handleClick={() => handleShowClick(country.name.common)} />
    </div>
    )
)
}
  
const CountryList = ({countriesToShow, handleShowClick}) => {
if (countriesToShow.length > 11) {
    return (
    <div> Too many matches, specify another filter </div>
    )
}
else if (countriesToShow.length === 1) {
    return (
    <div>
        <CountryDetails countriesToShow={countriesToShow} />
    </div>
    )
}
    
return (
    <CountryPart countriesToShow={countriesToShow} handleShowClick={handleShowClick} />
    )
}

export default CountryList
