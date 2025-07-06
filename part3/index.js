require('dotenv').config() // load environment variables from .env file
const express = require('express') // import the express module to create a web server
const app = express()              // create an instance of an Express application
const morgan = require('morgan')   // import the morgan module for logging HTTP requests
const Person = require('./models/person') // import the Person model from the models directory

app.use(express.json()) // middleware to parse JSON bodies
// app.use(morgan('tiny')) // middleware to log request details with the 'tiny' format

// 1. Define the new 'body' token to access the request body
morgan.token('body', (request, response) => JSON.stringify(request.body))
// 2. Use a custom format string that includes the new token at the end of the tiny format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build')) // middleware to serve static files from the 'backend' directory

// route: handle HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
  response.send('<h1>Welcome to the Phonebook!</h1>')
})

// route: count the number of persons in the phonebook and return the info
app.get('/info', (request, response) => {
    const date = new Date() // get the current date and time
    Person.countDocuments({}) // count the number of documents in the Person collection
    .then(personsCount => {
        if (personsCount === null) {
            console.error('Error counting persons:', error)
            return response.status(500).send({ error: 'Failed to count persons' })
        }
        // create an info message with the count of persons and the current date
        const dateString = date.toLocaleString() // format the date to a readable string
        const infoMessage = `<p>Phonebook has info for ${personsCount} people</p>
                             <p>${dateString}</p>`
        response.send(infoMessage) // send the info message as the response
    })
    .catch(error => {
        console.error('Error counting persons:', error)
        response.status(500).send({ error: 'Failed to count persons' })
    })
})

// fetch all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => {
        console.error('Error fetching persons:', error)
        response.status(500).send({ error: 'Failed to fetch persons' })
    })
})

// fetch a specific person by its id
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end() // if person not found, return 404
        }
    }).catch(error => {
        console.error('Error fetching person:', error)
        response.status(500).send({ error: 'Failed to fetch person' })
    })
})

// delete a specific person
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    // persons = persons.filter(person => person.id !== id)
    Person.findByIdAndDelete(id)
    .then(() => {
        console.log(`Deleted person with id: ${id}`)
        response.status(204).end()
    })
    .catch(error => {
        console.error('Error deleting person:', error)
        return response.status(500).send({ error: 'Failed to delete person' })
    })
})

// const generateId = () => {
//     const randId = Math.floor(Math.random() * 1000) +1

//     const personExists = persons.some(person => person.id === String(randId))
//     if (personExists) {
//         return generateId() // recursively call to ensure unique ID
//     } else {
//         // if the ID is unique, return it
//         return String(randId)
//     }
// }

// route: add a new person
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined || body.name === '' ||
        body.number === undefined || body.number === '') {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    } 
    
    // query the database to check for duplicates
    Person.findOne({ name: body.name })
    .then(existingPerson => {
      // If a person with that name is found, return an error
      if (existingPerson) {
        return response.status(400).json({
          error: 'name must be unique'
        });
      }

      // If no duplicate was found, create and save the new person
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person.save()
        .then(savedPerson => {
            response.json(savedPerson);
            console.log(`Added ${savedPerson.name} number ${savedPerson.number} to phonebook`);
        })
        .catch(error => next(error)); // Handle errors during save
    })
    .catch(error => next(error)); // Handle errors during findOne
})

// middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})