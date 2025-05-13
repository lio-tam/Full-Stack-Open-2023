import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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