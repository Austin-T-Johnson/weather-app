import React, { useState, useEffect } from 'react'
import axios from 'axios';
import cities from '../JSON/cities.json';
const Weather = () => {

    const [location, setLocation] = useState('');
    const [temp, setTemp] = useState();
    const [condition, setCondition] = useState('');
    const [icon, setIcon] = useState();
    const [high, setHigh] = useState();
    const [low, setLow] = useState();
    let API_KEY = process.env.REACT_APP_API_KEY;

    let city = cities.map((c) => {
        return c.name
    })


    const getCurrentWeather = async () => {
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Los Angeles&days=1&aqi=no&alerts=no
        `)
            .then(res => {
                let name = res.data.location.name
                let temp = res.data.current.temp_f
                let condition = res.data.current.condition.text
                let icon = res.data.current.condition.icon
                let high = res.data.forecast.forecastday[0].day.maxtemp_f
                let low = res.data.forecast.forecastday[0].day.mintemp_f
                setLocation(name);
                setTemp(temp);
                setCondition(condition);
                setIcon(icon);
                setHigh(high);
                setLow(low);
                // console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    useEffect(() => {
        getCurrentWeather()
    }, [])

    return (
        <div className='card-container'>
            <div className='card'>
                <div className='card-contents'>
                    <h1>{location}</h1>
                    <span className='temp'>{temp} °F</span>
                    <span className='condition'>{condition}</span>
                   <span className='high'>H: {high}</span>
                    <span className='low'>L: {low}</span>
                    <img src={icon} alt="" />
                </div>

            </div>

        </div>

    )
}

export default Weather