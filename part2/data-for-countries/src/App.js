import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries';

const App = () => {
    const [ countries, setCountries ] = useState([]) 
    
    const [ newSearch, setNewSearch ] = useState('')
  
    const hook = () => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
    }
    
    useEffect(hook, [])

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    const filterCountries = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase())) 

    return (
      <div>
        <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
        <Countries filterCountries={filterCountries} setNewSearch={setNewSearch} />
      </div>
    )

  
  }
  
  
  export default App;