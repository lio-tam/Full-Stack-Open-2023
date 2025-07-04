// This module provides functions to interact with a REST API for managing persons.
// It uses axios for HTTP requests and exports functions to get all persons, create a new person,
// remove a person by ID, and update a person's information.

import axios from 'axios'
const baseUrl = 'api/persons' // relative path as both front and back share the same host

const getAll = () => {
  const request = axios.get(baseUrl)  // HTTP GET
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)  // HTTP POST
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)  // HTTP DELETE
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject) // HTTP PUT
  return request.then(response => response.data)
}

// // key: variable pairs
// export default { 
//   getAll: getAll, 
//   create: create
// }
export default {getAll, create, remove, update} // since the names of keys and variables are the same