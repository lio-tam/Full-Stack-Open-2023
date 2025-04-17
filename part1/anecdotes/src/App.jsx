import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const MaxVote = ({ votes, anecdotes }) => {
  const maxVote = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVote)

  if (maxVote === 0) {
    return <p>No votes yet</p>
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <br />
      <p>has {maxVote} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const copy = [...votes] // create a copy of the votes array to avoid mutating the state directly
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes</p>
      <Button onClick={() => handleVote()} text='vote' />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} 
        text='next anecdote' />
      <MaxVote votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App