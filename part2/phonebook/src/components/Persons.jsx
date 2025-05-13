const Persons = ({filteredPersons, handleDelete}) => {
    return (
        <ul>
            {filteredPersons.map(person => (
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => handleDelete(person.id, person.name)}>
                        delete
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Persons