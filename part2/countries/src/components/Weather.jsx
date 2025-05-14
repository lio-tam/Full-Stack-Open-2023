const Weather = ({ weather }) => {
    if (weather) {
        return (
            <div>
                <h2>Weather in {weather.name}</h2>
                <p>Temperature {weather.main.temp} Celsius</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    // alt={`Flag of ${selectedCountry.name.common}`}
                    width={100}
                />
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
    return null
}
export default Weather