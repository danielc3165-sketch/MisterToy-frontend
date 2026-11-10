import { httpService } from "../http.service"
import { utilService } from "../util.service"

export const toyService = {
    query,
    getById,
    save,
    remove,
    addMsg,
    removeMsg,
}  


async function query(filterBy) {
    return httpService.get('toy',filterBy) 
}


async function getById(toyId) {
    try{
        return httpService.get('toy/' + toyId)
    }
    catch (err) {
        'Cannot get toy',err
        throw err
    }
}

async function remove(toyId) {
    return httpService.delete('toy/'+toyId)
}

async function save(toy) {
    if (toy._id) {
        return httpService.put('toy/'+toy._id,toy)
    }
     else {   
        return httpService.post('toy',toy)
    }
}

async function addMsg(toyId, msg) {
   return  httpService.post('toy/' + `${toyId}/msg`, msg)
}

async function removeMsg(toyId, msgId) {
   return httpService.delete('toy/' + `${toyId}/msg/${msgId}`)
}


