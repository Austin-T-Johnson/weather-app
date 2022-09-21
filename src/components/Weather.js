import React, { useState, useEffect } from 'react'
import axios from 'axios';
import cities from '../JSON/cities.json';

const initValue = {
    input: 'Los Angeles'
}
const Weather = () => {
    const [values, setValues] = useState(initValue);
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

    const onChange = evt => {
        setValues({ ...values, input: evt.target.value })
        console.log(evt.target.value)
    }

    const onSubmit = () => {
        getCurrentWeather();
    }

  

    const getCurrentWeather = async () => {
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${values.input}&days=1&aqi=no&alerts=no
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
                console.log(res.data)
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
            <div className='search-container'>
                <div className="searchbar">
                    <div className="searchbar-wrapper">
                        <div className="searchbar-left">
                            <div className="search-icon-wrapper">
                                <span className="search-icon searchbar-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="searchbar-center">
                            <div className="searchbar-input-spacer"></div>
                            <form>
                            <input
                                type="text"
                                className="searchbar-input"
                                onChange={onChange}
                                value={values.input}
                                maxLength="200"
                                name="q"
                                autoCapitalize="off"
                                autoComplete="off"
                                title="Search"
                                role="combobox"
                                placeholder="Search City" />
                                </form>
                        </div>


                    </div>
                </div>
              
                <div onClick={onSubmit} className='svg-container'>
                    <svg className="button" width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
                        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                    </svg>
                </div>
            </div>


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