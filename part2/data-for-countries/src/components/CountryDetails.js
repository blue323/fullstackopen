import React from 'react'
import Weather from './Weather'


const CountryDetails = ({ filterCountries }) => {
    return (
        <div>
            {filterCountries.map(country => 
                <div key={country.alpha3Code}>
                    <h2>{country.name}</h2> 
                    <li>capital {country.capital}</li> 
                    <li>population {country.population}</li>
                    <h3>languages</h3>
                    <div>
                        <ul>{country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}</ul>
                    </div>
                    <img src={country.flag} style={{width: 200, height: 200}} />
                    <Weather country={country} />
                </div>
                )
            }
        </div>
    )
}

export default CountryDetails