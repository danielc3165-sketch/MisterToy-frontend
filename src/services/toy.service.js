import axios from "axios"
import { utilService } from "./util.service"

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
}  

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 
               'Outdoor', 'Battery Powered'] 

const url = 'http://localhost:3030/api/toy'


function query() {
    return axios.get(url)
    .then(res => res.data)
}


function getById(toyId) {
    console.log('o.k')
    return axios.get(url + '/' + toyId, { withCredentials: true })
    .then(res => res.data)
    .catch(err => {'Cannot get toy',err})
}

function remove(toyId) {
    return axios.delete(url+'/' + toyId)
    .then(res => console.log('res',res))
}

function save(toy) {
    if (toy._id) {
        return axios.put(url+'/'+toy._id, toy)
        .then(res => console.log('res',res))
    }
     else {
        return axios.post(url, toy)
        .then(res => res.data)

    }
}

function getEmptyToy(){
    return { 
imgUrl: 'hardcoded-url-for-now', 
labels: _getToyLabels(), 
inStock:utilService.getRandomIntInclusive(1, 2) === 1 ? true :false 
}
}

function _getToyLabels(){
    
    const idx1 = utilService.getRandomIntInclusive(0, 3)
    const idx2 = utilService.getRandomIntInclusive(4, 7)

    return [labels[idx1],labels[idx2]]
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}
