const express = require('express') // import the express module to create a web server
const app = express()              // create an instance of an Express application
const morgan = require('morgan')   // import the morgan module for logging HTTP requests

// javascript object that represents the json persons in the app
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json()) // middleware to parse JSON bodies
// app.use(morgan('tiny')) // middleware to log request details with the 'tiny' format

// 1. Define the new 'body' token to access the request body
morgan.token('body', (request, response) => JSON.stringify(request.body))
// 2. Use a custom format string that includes the new token at the end of the tiny format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build')) // middleware to serve static files from the 'backend' directory

// route: an event handler that is used to handle HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
  response.send('<h1>Welcome to the Phonebook!</h1>')
})

app.get('/info', (request, response) => {
    const date = new Date() // get the current date and time
    const personsCount = persons.length
    const infoMessage = `<p>Phonebook has info for ${personsCount} people</p>
                         <p>${date}</p>`
    response.send(infoMessage)
})

// route: handles HTTP GET requests made to the persons path of the application
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// route: fetch a specific person by its id
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// route: delete a specific person by its id
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const randId = Math.floor(Math.random() * 1000) +1

    const personExists = persons.some(person => person.id === String(randId))
    if (personExists) {
        return generateId() // recursively call to ensure unique ID
    } else {
        // if the ID is unique, return it
        return String(randId)
    }
}

// route: add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined || body.name === '' ||
      body.number === undefined || body.number === '') {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  } else if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

// middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001 || process.env.PORT // or use the PORT environment variable 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})