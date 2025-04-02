import { useState, useEffect} from 'react'

function Weather() {

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
  const city = "Pittsburgh"

  useEffect(() => {
    // hit the api endpoing
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`)
    .then((response) => response.json())
    .then((data) => {
      setWeather(data); // save the weather data
      setLoading(false); // done loading
    })
    .catch((error) => {
      console.error("Error fetching weather.", error);
      setLoading(false);
    });
  }, []); // empty array = run only on on mount
  
if (loading) return <p> loading...</p>

return (
    <div>
        <h2> Weather in {weather.name}</h2>
        <p> {weather.weather[0].main} - {weather.weather[0].description}</p>
        <p> {weather.main.temp} °F </p>
    </div>
);
}

export default Weather