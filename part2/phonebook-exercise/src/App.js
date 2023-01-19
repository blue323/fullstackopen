import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter'
import Form from './components/Form';
import Persons from './components/Persons';
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage] = useState(null)
  /*const [errorMessage, setErrorMessage] = useState(null)*/
  const [ classNme, setClassNme] = useState('')

 /* const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])*/

 useEffect(() => {
    personsService      
    .getAll()      
    .then(initialPersons => {        
      setPersons(initialPersons)      
    })  
  }, [])

 

  const addPerson = (event) => {
    event.preventDefault()

    let existingPerson = persons.find(person => person.name === newName)

    if(existingPerson) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)

      const changedExistingPerson = { ...existingPerson, number: newNumber }

      personsService      
        .update(existingPerson.id, changedExistingPerson)      
        .then(returnedPerson => {        
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))        
          setNewName('')
          setNewNumber('')
          setMessage(          
            `Changed ${existingPerson.name} number`        
          )
          setClassNme('green')
          console.log(classNme)        
          setTimeout(() => {          
              setMessage(null)
              setClassNme('')        
          }, 5000)
      })

    } else {
      const personObject = {
        name: newName,
        /*id: persons.length + 1,*/ 
        number: newNumber
      }

      personsService      
        .create(personObject)      
        .then(returnedPerson => {        
          setPersons(persons.concat(returnedPerson))        
          setNewName('')
          setNewNumber('')
          setMessage(          
            `Added ${returnedPerson.name}`        
          )
          setClassNme('green')        
          setTimeout(() => {          
              setMessage(null)
              setClassNme('')        
          }, 5000)    
        })
        .catch(error => {
          setMessage(
            `${error.response.data.error}`
          )
          setClassNme('delete')
          setTimeout(() => {          
            setMessage(null)
            setClassNme('')        
        }, 5000)
          console.log(error.response.data)
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name} ?`)

    if(confirmDelete) {
      personsService      
        .deletePrsn(id)      
        .then(() => {        
          setPersons(persons.filter(person => person.id !== id))  
          setMessage(          
            `Removed ${person.name}`        
          )
          setClassNme('delete')        
          setTimeout(() => {          
              setMessage(null)
              setClassNme('')        
          }, 5000)    
      })
        .catch(() => {
          setMessage(          
            `Information on ${person.name} has already been removed from server`        
          )
          setClassNme('delete')        
          setTimeout(() => {          
              setMessage(null)
              setClassNme('')        
          }, 5000) 
        })

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  

  const filterName = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())) 
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={classNme} />
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
        <Form  
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons 
          filterName={filterName}
          deletePerson={deletePerson}  
        />
    </div>
  )
}

export default App;