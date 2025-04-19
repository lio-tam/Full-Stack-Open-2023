const Person = ({person}) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  )
}

const Persons = ({filteredPersons}) => {
    return (
        <ul>
            {filteredPersons.map(person => 
                <Person key={person.name} person={person} /> 
            )}
        </ul>
    )
}

export default Persons