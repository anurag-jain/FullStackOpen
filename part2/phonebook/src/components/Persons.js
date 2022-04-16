const PersonRow = ({person, onDelete}) => {
  return(<div>
    {person.name} {person.number} {" "}
    <button onClick={()=> {onDelete(person)}}>Delete</button>
  </div>)

}


const Persons = ({personsToShow, onDelete})=>{
  return (
    <>
      {personsToShow.map((person) => { return <PersonRow key={person.id} person={person} onDelete={onDelete}/>})}
    </>
    )
}

export default Persons;