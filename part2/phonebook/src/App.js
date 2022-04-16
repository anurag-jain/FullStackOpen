import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('');
  const [notification, setNotification] = useState({msgType:'', message:''});

  useEffect(()=>{
    phonebookService
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons);
    })
  }, [])

  let personsToShow = persons;

  const handleNameChange = (event)=>{
    setNewName(event.target.value);
  }

  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event)=>{
    setSearchString(event.target.value);
  }

  const updateList = (personArray)=>{
    setPersons(personArray);
    setNewName("");
    setNewNumber("");
  }

  const showNotification = (msgObj) => {
    setNotification(msgObj);
    setTimeout(() => {
      setNotification({msgType:'', message:''});
    }, 3000);
  }

  const addPerson = (event)=> {
    event.preventDefault();

    let search = persons.find( person => person.name === newName)

    if(search === undefined)
    {
      let person = { name : newName, number: newNumber }

      phonebookService
        .createNew(person)
        .then((newPerson)=>{
          updateList(persons.concat(newPerson));
          showNotification({msgType:"info", message: `Added ${newPerson.name}`})
      })
    }
    else
    {
      let shouldUpdate = window.confirm(`${search.name} already exists. Update ?`)
      if(shouldUpdate)
      {
        let person = {...search, number : newNumber}

        phonebookService
          .update(person.id, person)
          .then((newPerson)=>{ 
            let personsCopy = persons.map((person)=>{ return person.id === newPerson.id ? newPerson : person});
            updateList(personsCopy);
            showNotification({msgType:"info", message: `Updated ${newPerson.name}`})
          })
          .catch((error)=>{
            showNotification({msgType: 'error', message : `Information for ${person.name} has been remove from server already`})
          })
      }


    }
  }

  const onDelete = (deletedPerson) => {
    let shouldDelete = window.confirm(`Delete ${deletedPerson.name}?`)
    if(shouldDelete)
    {
      phonebookService
      .remove(deletedPerson.id)
      .then(()=>{
        let newPersons = persons.filter((person) => { return person.id !== deletedPerson.id});
        setPersons(newPersons);
      });
    }
  }

  if(searchString.length > 0)
    personsToShow = persons.filter((person)=>{ return person.name.toLowerCase().includes(searchString.toLowerCase())})
  else
    personsToShow = persons;

  return (
    <div>
      <Notification msgType={notification.msgType} message={notification.message}/>
      <h2>Phonebook</h2>
      <Filter value={searchString} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName = {newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} onDelete={onDelete}/>
      
    </div>
  )
}

export default App