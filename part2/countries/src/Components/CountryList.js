import { useState } from "react";
import CountryInfo from "./CountryInfo";

const Button = (props)=>{
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
  
const Country = ({country})=>{
  let [show, setShow] = useState(false);


  if(show)
  {
    return (<>
      <CountryInfo country={country}/>
      <Button text="Hide" onClick={()=>{setShow(false)}}/>
    </>);
  }

  return (<>
  <div> 
    {country.name.common}{" "}
    <Button text="Show" onClick={()=>{setShow(true)}}/>
  </div>
  
  </>);
}

export default Country;