
import { storageService } from "../async-storage.service.js"
import { utilService} from "../util.service.js"

export const toyService = {
    query,
    getById,
    save,
    remove,
}

const toysAlt = [
{ 
_id: 't101', 
name: 'Talking Doll', 
imgUrl: 'hardcoded-url-for-now', 
price: 123, 
labels: ['Doll', 'Battery Powered', 'Baby'], 
createdAt: 1631031801011, 
inStock: true, 

},
{
_id: 't102',
name: 'Wooden Train Set',
imgUrl: 'hardcoded-url-for-now',
price: 89,
labels: ['On wheels', 'Baby'],
createdAt: 1631031801012,
inStock: true,
},
{
_id: 't103',
name: 'Jigsaw Puzzle',
imgUrl: 'hardcoded-url-for-now',
price: 25,
labels: ['Puzzle'],
createdAt: 1631031801013,
inStock: false,
},
{
_id: 't104',
name: 'Watercolor Set',
imgUrl: 'hardcoded-url-for-now',
price: 35,
labels: ['Art'],
createdAt: 1631031801014,
inStock: false,
},
{
_id: 't105',
name: 'Outdoor Ball',
imgUrl: 'hardcoded-url-for-now',
price: 18,
labels: ['Outdoor', 'On wheels'],
createdAt: 1631031801015,
inStock: true,
},
]

const STORAGE_KEY = 'toys'


function query() {
    return storageService.query(STORAGE_KEY)
         .then(toys => { 
            if(!toys || toys.length === 0) {
                utilService.saveToStorage(STORAGE_KEY,toysAlt)
                toys = toysAlt
            }
            return toys
        //     if (!filterBy.txt) filterBy.txt = ''
        //     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
        //     const regExp = new RegExp(filterBy.txt, 'i')
        //     return cars.filter(car =>
        //     {
            //     return regExp.test(car.vendor) &&
            //     car.price <= filterBy.maxPrice
            // }
            // )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        //toy.owner = userService.getLoggedinUser()
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}





