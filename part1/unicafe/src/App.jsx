import { useState } from 'react'


const Statistic = (props) => {
  const total = props.good + props.neutral + props.bad
  if (total === 0){
    return (
      <div>
        <p>Please, submit feedback.</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" count={props.good} />
        <StatisticLine text="neutral" count={props.neutral} />
        <StatisticLine text="bad" count={props.bad} />
        <StatisticLine text="all" count={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" count={((props.good * 1 + props.neutral * 0 + props.bad * (-1))/(total)).toFixed(1)} />
        <StatisticLine text="positive" count={`${(props.good / total * 100).toFixed(1)}%`} />
      </tbody>
    </table>
  )
}


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.count}</td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text} </button>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App