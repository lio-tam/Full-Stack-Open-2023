import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )

}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = (good - bad) / total
  let positive = (good / total) * 100

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={total} />
          <StatisticsLine text='average' value={average.toFixed(1)} />
          <StatisticsLine text='positive' value={positive.toFixed(1) + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App