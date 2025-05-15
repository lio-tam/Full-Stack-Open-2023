const Countries = ({ filteredCountries, selectedCountry, handleShow }) => {
    if (filteredCountries === null) return null
    if (filteredCountries.length > 10) return (<p>Too many matches, specify another filter</p> )
    if (selectedCountry) {
        return (
            <div>
                <h1>{selectedCountry.name.official}</h1>
                <p>Capital: {selectedCountry.capital}</p>
                <p>Area: {selectedCountry.area} (km^2)</p>
                <h2>Languages:</h2>
                <ul>
                    {Object.values(selectedCountry.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img
                    src={selectedCountry.flags.png}
                    alt={`Flag of ${selectedCountry.name.common}`}
                    width={250}
                />
            </div>
        )
    }
    return (
        <ul>
            {filteredCountries.map(c => (
                <li key={c.cca3}>
                    {c.name.common}
                    <button onClick={() => handleShow(c)} >
                        details
                    </button>
                </li>
            ))}
        </ul>
    ) 
}
export default Countries