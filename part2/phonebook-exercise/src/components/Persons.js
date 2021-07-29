import React from 'react';

const Persons = ({ filterName, deletePerson }) => {
    return (
        <div>{filterName.map(person => <li key={person.id} >{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>)}</div>
    )
}

export default Persons;