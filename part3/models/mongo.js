// Description: This script helps test the connection to a MongoDB database, 
// create a new person, or list all persons in the phonebook.

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2] // cammand line argument for password

const url = `mongodb+srv://liosac17:${password}@cluster0.ieiplne.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
// mongodb+srv://liosac17:xxf9ZByIA8tKsSSh@cluster0.ieiplne.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0


mongoose.set('strictQuery',false)
mongoose.connect(url)

// Define a schema for the Person model i.e the structure of the documents in a collection
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Create a class model based on the schema, which is used to create and read documents from the collection
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    // create a new person
    const name = process.argv[3]
    const number = process.argv[4]
    
    const person = new Person({
        name: name,
        number: number,
    })
    
    // Save the new person to the database
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        // must be called at inside the then() block to ensure the connection is closed after the save operation
        mongoose.connection.close() 
    })
    return

} else if (process.argv.length === 3) {
    // list all persons in the database
    console.log('phonebook:')
    console.log('------------------')
    // Fetch all persons from the database and log them to the console
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
    return
} else {
    // Optional: handle incorrect number of arguments
    console.log('Please use the format: node mongo.js <password> <name> <number>');
    mongoose.connection.close();
}

