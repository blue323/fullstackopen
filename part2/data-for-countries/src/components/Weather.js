import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ country }) => {
    const [ weather, setWeather ] = useState([])

    useEffect(() => {
        const params = {
            access_key:  process.env.REACT_APP_API_KEY,
            query: country.capital
          }
        axios
          .get('http://api.weatherstack.com/current', {params} )
          .then(response => {
            setWeather(response.data.current)
          })
      }, [country])

      
      
    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt="weather icon" />
            <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather