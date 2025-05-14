// import { useState } from 'react'
import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/servePersons'

const App = () => {
  // States to store data for rendering
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [newError, setNewError] = useState(0)

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  // define how often it fetches data from the json server
  useEffect(
    ()=>{
      console.log('effect')
      personService
        .getAll()
        .then(initialPersons=>{
          console.log('promise fullfilled')
          setPersons(initialPersons)
        })
    }, []   // empty array → run only once i.e fetch only on mount
  )
  console.log('render', persons.length, 'notes')

  // save the current filtered list of contact
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  // event handler for adding new contact to phonebook upon 'add' click
  const addContact = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // avoid direct mutation of the object
        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const changedPerson = {... existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson=>{
            // map p to p for person who is not the newly changed person, else map that p to the changed person
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewMessage(`${returnedPerson.name}'s phone number is successfully updated to ${returnedPerson.number}!`)
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNewError(true)
            setNewMessage(`Information of ${changedPerson.name} has already been removed from server`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setTimeout(() => {
              setNewError(false)
              setNewMessage(null)
            }, 5000)
          })
      }
      return
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      // post the new obj and fetch and render the new data 
      personService.create(personObj).then(initialPersons=>{
          setPersons(persons.concat(initialPersons))
          setNewMessage(`${initialPersons.name} is successfully added to phonebook!`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
      }) 
    }
  }

  // event handler for removing a contact from phonebook upon 'delete' click
  const removeContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setNewError(true)
          setNewMessage(
            `Information of ${name} has already been removed from server`
          )
          setTimeout(() => {
            setNewError(false)
            setNewMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} toggleError={newError} />
      <Filter newValue={newFilter} handler={handleNewFilter} />

      <h3>add a new</h3>

      <PersonForm
        handleAdd={addContact}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h3>Numbers</h3>

      <Persons 
        filteredPersons={filteredPersons}
        handleDelete={removeContact}
      />

    </div>
  )
}

export default App