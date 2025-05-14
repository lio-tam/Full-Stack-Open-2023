import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [countryDetail, setCountryDetail] = useState(null) // store the concrete details on demand
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  // handling new input in the filtering field for countries
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  // save the current filtered list of countries
  const lowerFilter = newFilter.toLowerCase()
  const filteredCountries = newFilter === '' ? [] 
    : countries.some(c => c.toLowerCase() === lowerFilter)? 
      countries.filter(c => c.toLowerCase() === lowerFilter)   // exact result
      : countries.filter(c => c.toLowerCase().includes(lowerFilter))

  // init countries with names only
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
  }, [])

  // fetch the details of a country when there is only country on the list
  useEffect(() => {
    if (filteredCountries.length === 1) {
      // fetch details
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${encodeURIComponent(filteredCountries[0])}`)
        .then(response => setCountryDetail(response.data)) // fetch one obj not the whole array
        .catch(() => setCountryDetail(null))
    } else {
      setCountryDetail(null)
      setWeather(null)
    }
  }, [filteredCountries])

  // fetch weather once we have the country detail
  useEffect(() => {
    if (!countryDetail || !countryDetail.latlng) return   // bail early

    const [lat, lon] = countryDetail.latlng
    const key = `${lat},${lon}`               // unique per capital

    // optional: skip if we already fetched the same coords
    if (weather && weather._key === key) return

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: { lat, lon, units: 'metric', appid: api_key }
      })
      .then(res => setWeather({ ...res.data, _key: key }))
      .catch(() => setWeather(null))
  }, [countryDetail, api_key])

  // fetch the details of a country upon clicking 'details'
  const handleShow = (name) => setNewFilter(name)

  return (
    <div>
      <Filter value={newFilter} onChange={handleNewFilter} />
      <Countries filteredCountries={filteredCountries} countryDetail={countryDetail} handleShow={handleShow} />
      <Weather weahterObj={weather} />
    </div>
  )
}

export default App