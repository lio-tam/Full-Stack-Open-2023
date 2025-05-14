import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  // handling new input in the filtering field for countries
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  // save the current filtered list of countries
  const lowerFilter = newFilter.toLowerCase()
  const filteredCountries = newFilter === ''
    ? []
    : countries.some(c => c.name.common.toLowerCase() === lowerFilter)
      ? countries.filter(c => c.name.common.toLowerCase() === lowerFilter)
      : countries.filter(c =>
          c.name.common.toLowerCase().includes(lowerFilter)
        )

  // auto-select or clear when filter text changes
  useEffect(() => {
    if (newFilter.trim() === '') {
      setSelectedCountry(null)
      setWeather(null)
      return
    }
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    } else {
      setSelectedCountry(null)
      setWeather(null)
    }
  }, [newFilter])

  // init countries with names only
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)            // keep entire objects
      })
  }, [])

  // fetch weather once we have the selected country
  useEffect(() => {
    if (!selectedCountry || !selectedCountry.latlng) return   // bail early

    const [lat, lon] = selectedCountry.latlng
    const key = `${lat},${lon}`               // unique per capital

    // optional: skip if we already fetched the same coords
    if (weather && weather._key === key) return

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: { lat, lon, units: 'metric', appid: api_key }
      })
      .then(res => setWeather({ ...res.data, _key: key }))
      .catch(() => setWeather(null))
  }, [selectedCountry, api_key])

  // fetch the details of a country upon clicking 'details'
  const handleShow = (countryObj) => {
    setSelectedCountry(countryObj)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleNewFilter} />
      <Countries
        newFilter={newFilter}
        filteredCountries={filteredCountries}
        selectedCountry={selectedCountry}
        handleShow={handleShow}
      />
      {selectedCountry && <Weather weather={weather} />}
    </div>
  )
}

export default App