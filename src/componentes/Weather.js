import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {

    const [weather, setWeather] = useState({})
    const [centigrade, setCentigrade] = useState(0)

    const [isCentigrade, setIsCentigrade] = useState(true)
   
    const success = pos => {

        const latitude = pos.coords.latitude
        const longitude = pos.coords.longitude
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6c145a6e9fd9d325a29ab78b23d055b4`)
        .then(res =>{ 
            setWeather(res.data)
            setCentigrade(Math.round(res.data.main?.temp - 273))
        })

    }

    console.log(weather)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    },[])

    const changeTemp = () => {

        if(isCentigrade){
            setIsCentigrade(false)
            setCentigrade((centigrade * 9/5) + 32 )
        }else{
            setIsCentigrade(true)
            setCentigrade(Math.round((centigrade - 32) * 5/9))
        }   
         
    }
    

    console.log(weather)
    
    return (
        <div className='app-clima'>
            
            <h1>Weather App</h1>

            
            <h2>{weather?.name} </h2>

            <section className='gnere'>

                <div className='icon'> 

                    <img src= {`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}alt="" />
                    <h2> {centigrade} <b>{isCentigrade? "°C":"°F"}</b></h2> 
            
                </div>

                <div className='Info-temp'>

                
                    <h3><b>Pressure: </b>  {weather.main?.pressure} Pa</h3>
                    <h3><b>Humidity: </b> {weather.main?.humidity} %</h3>
                    <h3><b>Cloud Cover: </b>{weather.clouds?.all}</h3>
                    <h3><b>Wind to: </b>  {weather.wind?.speed} </h3>

                </div>

            </section>

            <button onClick={changeTemp} className='btn'>°C / °F</button>

        </div>
    );
};

export default Weather;