import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const getAll = ()=> {
    let request =  axios.get(baseUrl);
    return request.then(response =>  response.data);
}

const createNew = (newObject) => {
    let request = axios.post(baseUrl, newObject);
    return request.then(response =>  response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response =>  response.data);
}

const remove = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response)=>{})
}
export default {getAll, createNew, update, remove}
