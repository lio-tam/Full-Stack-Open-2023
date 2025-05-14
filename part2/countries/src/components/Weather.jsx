const Weather = ({weahterObj}) => {
    if (weahterObj) {
        return (
            <div>
                <p>Temperature {weahterObj.main.temp} Celsius</p>
                <p>Wind {weahterObj.wind.speed} m/s</p>
            </div>
        )
    }
    return null
}
export default Weather