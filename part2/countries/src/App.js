import { useState, useEffect } from "react";
import axios from 'axios'
import CountryInfo from "./Components/CountryInfo";
import Country from "./Components/CountryList";

const Content = ({countries})=>{
  if(countries.length === 1)
  {
    return (
      <CountryInfo country={countries[0]}/>
    );
  }
  else if(countries.length < 10)
  {
    return ( <>
    {
      countries.map((country, index)=> { 
        return (<Country key={index} country={country}/>)
        })
    }
    </>);
  }
  else
    return (<p>Too many coutnries Matching</p>);
}


const App = ()=>{

  const [currentFilterText, setCurrentFilterText] = useState('');
  const [countries, setCountries] = useState([]);

  const handleFilterChange = (event)=>{
    setCurrentFilterText(event.target.value)
  }

  let countriesToShow = [];
  if(currentFilterText.length > 0)
    countriesToShow = countries.filter((country)=>{ return country.name.common.toLowerCase().includes(currentFilterText)})
  

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response)=>{
        setCountries(response.data);
      })
  }, []);

return (
  <>
    Find Countries <input value={currentFilterText}  onChange={handleFilterChange}></input>
    <Content countries={countriesToShow}/>
  </>
);


}

export default App;
