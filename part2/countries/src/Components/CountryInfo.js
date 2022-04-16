import { useEffect, useState } from "react"
import axios from "axios"

const Languages = ({languages})=> {
  return (
      <>
      <h3>Languages</h3>
      <ul>
      {Object.entries(languages).map(([key, value], index)=>{ return <li key={index}>{value}</li>})}
      </ul>
      </>
  )
}

const Weather = ({country})=>{

  let lat = country.latlng[0];
  let lon = country.latlng[1];
  let apiKey = process.env.REACT_APP_API_KEY;
  
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url)

  let [weather, setWeather] = useState({});

  useEffect( ()=>{
    axios.get(url)
    .then((response)=>{
      console.log(response.data)
      setWeather(response.data);
    })
  },[])


  if(weather.main)
  {
    let imageUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (<>
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={imageUrl}/>
      <p>Wind {weather.wind.speed}{" m/s"}</p>
    </>)
  }

  return (<></>);
}
  
const CountryInfo = ({country})=>{
  return (<>
    <h2>{country.name.common}</h2>
    <p>Capital {country.capital[0]}</p>
    <p>Area {country.area}</p>
    <Languages languages={country.languages}/>
    <p>{country.flag}</p>
    <Weather country={country}/>
  </>)
}

export default CountryInfo;