const mongoose = require('mongoose')

mongoose.set('strictQuery',false) // Set mongoose to use strict query mode, which helps avoid deprecation warnings

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const password = process.argv[2]
// const url = `mongodb+srv://liosac17:${password}@cluster0.ieiplne.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI // use the env var for the MongoDB URI

console.log('connecting to', url)
mongoose.connect(url)
.then(() => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// format the schema to convert it to JSON and remove unnecessary fields
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)