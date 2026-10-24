import { httpService } from "./http.service"
import { utilService } from "./util.service"

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
}  

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 
               'Outdoor', 'Battery Powered'] 


async function query(filterBy) {

    return httpService.get('toy',filterBy)
    
    // const res = await axios.get(url,{params:filterBy})
    // return res.data
}


async function getById(toyId) {
    try{
        return httpService.get('toy/' + toyId,{ withCredentials: true })
    // const res = await axios.get(url + '/' + toyId, { withCredentials: true })
    // return res.data
    }
    catch (err) {
        'Cannot get toy',err
        throw err
    }
}

async function remove(toyId) {

    return httpService.delete('toy/'+toyId)
    // const res = await axios.delete(url+'/' + toyId)
    // console.log(res.data) 
}

async function save(toy) {
    if (toy._id) {
        return httpService.put('toy/'+toy._id,toy)
        // const res = await axios.put(url+'/'+toy._id, toy)
        // return res.data
    }
     else {
        
        return httpService.post('toy',toy)
        // const res = await axios.post(url, toy)
        // return res.data

    }
}

function getEmptyToy(){
    return { 
    imgUrl: 'hardcoded-url-for-now', 
    labels: _getToyLabels(), 
    inStock:utilService.getRandomIntInclusive(1, 2) === 1 ? true :false 
}
}

function getDefaultFilter() {
    return { txt: '', inStock: false, labels:[], sortBy:'createdAt' }
}

function getLabels(){
    return labels
}

function _getToyLabels(){
    
    const idx1 = utilService.getRandomIntInclusive(0, 3)
    const idx2 = utilService.getRandomIntInclusive(4, 7)

    return [labels[idx1],labels[idx2]]
}