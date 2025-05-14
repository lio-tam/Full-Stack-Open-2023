const Countries = ({filteredCountries, countryDetail, handleShow}) => {
    if (filteredCountries === '') return null
    if (filteredCountries.length > 10) return (<p>Too many matches, specify another filter</p> )
    if (countryDetail) {
        return (
            <div>
                <h1>{countryDetail.name.official}</h1>
                <p>Capital: {countryDetail.capital}</p>
                <p>Area: {countryDetail.area} (km^2)</p>
                <h2>Languages:</h2>
                <ul>
                    {Object.values(countryDetail.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img
                    src={countryDetail.flags.png}
                    alt={`Flag of ${countryDetail.name.common}`}
                    width={250}
                />
                <h2>Weahter in {countryDetail.capital}</h2>
            </div>
        )
    }
    return (
        <ul>
            {filteredCountries.map(c => (
                <li key={c}>
                    {c}
                    <button onClick={() => handleShow(c.toLowerCase())} >
                        details
                    </button>
                </li>
            ))}
        </ul>
    ) 
}
export default Countries