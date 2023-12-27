import { useState, useEffect } from 'react'
import personNumbers from './services/numbers'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const Person = ({ person, deletePerson }) => {
  console.log(`Test1: '${deletePerson} ${person.id}'`)
  return (
    <div>
      {person.name} {person.number}
      <Button type="button" text="delete" handleChange={() => deletePerson(person.id)} />
    </div>
  )
}

const PersonsList = ({ personsToShow, deletePerson }) => {
  console.log(`Test2: '${personsToShow}'`)
  return (
    <ul>
      {personsToShow.map(person => {
        console.log("Person: ", deletePerson);
        return (
          <Person key={person.id} id={person.id} person={person} deletePerson={deletePerson} />
        )
      })}
    
    </ul>
  );
}

const Filter = ({value, handleChange}) => {
  return (
    <div> search: <input value={value} onChange={handleChange} /> </div>
  )
}

const Button = ({type, text, handleChange}) => {
  return (
    <button type={type} onClick={handleChange}>{text}</button>
  )
}

const FormPart = ({text, value, handleChange}) => {
  return (
    <div> {text} <input value={value} onChange={handleChange} /> </div>
  )
}

const PersonForm = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormPart text="name:" value={newName} handleChange={handleNameChange} />
      <FormPart text="number:" value={newNumber} handleChange={handleNumberChange} />
      <Button type="submit" text="add" />
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personNumbers
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    const updatedPerson = { ...newPerson, number: newNumber }
    const existingPerson = persons.find(element => element.name.toLowerCase() === newPerson.name.toLowerCase())
    console.log(newPerson.id)

    if(existingPerson) {
        const id = existingPerson.id
        window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
          ?
            personNumbers
            .update(id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
              setInfoMessage(`Successfully updated ${newName}`)
              setTimeout(() => {
                setInfoMessage(null)
                }, 5000)
            })
          :
            console.log('nothing to update')
            setInfoMessage(`Nothing was updated.`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
    }
      else
        personNumbers
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setInfoMessage(`Successfully added ${newName}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
  } 

  const deletePerson = id => {
    console.log(`Test3: '${id}'`)
    const person = persons.find(person => person.id === id)

    window.confirm(`Delete ${person.name} ?`)
      ?
        personNumbers
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`${person.name} was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      :
        console.log('nothing to delete')
  }


  const personsToShow = search === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase()))


  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleSearchChange = (event) => {setSearch(event.target.value)}

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={infoMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={search} handleChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonsList personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
