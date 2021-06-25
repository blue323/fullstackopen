import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick} >{text}</button>

const Anecdote = ({ anecdotes, vote }) => {
  return (
    <div>
      {anecdotes}
      <br/>
      has {vote} votes
      <br/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0])
  const [mostVoted, setMostVoted] = useState(0)

  const handleClick = () => {
      setSelected(Math.floor(Math.random() * 6 ))
  }

  const handleVote = () => {
    const copyVote = [...vote]
    copyVote[selected] += 1
    setVote(copyVote)
    
    if(copyVote[selected] > copyVote[mostVoted]) {
      setMostVoted(selected)
    }
  }

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes[selected]} vote={vote[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleClick} text='next anecdote' />

      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes[mostVoted]} vote={vote[mostVoted]} />
    </div>
  )
}

export default App