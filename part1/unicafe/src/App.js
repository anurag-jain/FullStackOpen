import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick} > {text}</button>
  )
}

const StatisticsLine = ({name, value})=>{
  return (
    <tr>
      <td>{name} </td>
      <td>{value}</td>
    </tr>
    
  )
}


const Statistics = ({good, neutral, bad}) => {

  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good / all) * 100;

  if(all === 0)
  {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticsLine name = "good" value={good}/>
        <StatisticsLine name = "neutral" value={neutral}/>
        <StatisticsLine name = "bad" value= {bad}/>
        <StatisticsLine name = "all" value={all}/>
        <StatisticsLine name = "average" value={average}/>
        <StatisticsLine name = "positive" value={positive.toString() + " %"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={()=> setGood(good+1)} text="Good"/>
      <Button onClick={()=> setNeutral(neutral+1)} text="Neutral"/>
      <Button onClick={()=> setBad(bad+1)} text="Bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral = {neutral} bad = {bad} />
    </>

  )
}

export default App