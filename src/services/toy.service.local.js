
import { storageService } from "./async-storage.service.js"
import { utilService} from "./util.service.js"

export const toyService = {
    query,
    getById,
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 
               'Outdoor', 'Battery Powered'] 

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

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

function remove(carId) {
    return storageService.remove(STORAGE_KEY, carId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
       //toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyCar() {
    return {
        vendor: '',
        price: '',
        speed: '',
    }
}

function getRandomCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(50, 150),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createCars() {
    var cars = utilService.loadFromStorage(STORAGE_KEY)
    if (cars && cars.length > 0) return

    cars = []
    for(var i = 0; i < 12; i++){
        const car = getRandomCar()
        car._id = utilService.makeId()
        cars.push(car)
    }
    utilService.saveToStorage(STORAGE_KEY, cars)
}