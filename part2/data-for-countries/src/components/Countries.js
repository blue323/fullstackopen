import React from 'react'
import CountryDetails from './CountryDetails'


const Countries = ({ filterCountries, setNewSearch }) => {
    return (
        <div>
        {
            filterCountries.length > 10 ?
            <p>Too many matches</p>
            :
            filterCountries.length > 1 && filterCountries.length < 10 ?
            <p>{filterCountries.map(country => <li key={country.alpha3Code}>{country.name} <button onClick={() => setNewSearch(country.name)}>show</button> </li>)}</p>
            :
            <CountryDetails filterCountries={filterCountries} />
          }
        </div>
    )
}

export default Countries