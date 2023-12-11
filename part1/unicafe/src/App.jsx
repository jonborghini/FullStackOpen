import { useState } from 'react'

const Counter = (props) => {
  return (
    <div>
      {props.text} {props.count}
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text} </button>)

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

      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>

      <h1>statistics</h1>

      <Counter text="good" count={good} />
      <Counter text="neutral" count={neutral} />
      <Counter text="bad" count={bad} />
    </div>
  )

}

export default App