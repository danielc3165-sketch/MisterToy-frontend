
import { storageService } from "./async-storage.service.js"

export const toyService = {
    query
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 
               'Outdoor', 'Battery Powered'] 

const toys = [
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


function query(){
    return toys
}