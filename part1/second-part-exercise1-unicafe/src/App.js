import React, { useState } from 'react'

const Button = ({ handleClick, text}) => {
    return(
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistic = ({ text, value }) => {
    if( text === 'positive') {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>
        )
    }
    return( 
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad}) => {
    if(good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )           
    }
    return(
        <div>
            <h1>statistics</h1>
            <table>
            <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={good + neutral + bad} />
            <Statistic text='average' value={(good - bad) / (good + neutral + bad)} />
            <Statistic text='positive' value={(good / (good + neutral + bad)) * 100 }  />
            </tbody>
            </table>
        </div>
    )
}

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
  
    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text='good'/>
            <Button handleClick={handleNeutralClick} text='neutral'/>
            <Button handleClick={handleBadClick} text='bad'/>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App;