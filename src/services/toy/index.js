const { DEV, VITE_LOCAL } = import.meta.env

import { utilService } from "../util.service.js" 

import { toyService as local } from './toy.service.local'
import { toyService as remote } from './toy.service.api'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 
               'Outdoor', 'Battery Powered'] 


function getEmptyMsg(){
   return {
    txt:'',
    by:{}
    }
}

function getEmptyReview(){
    return {
        txt:'',
        userId:'',
        toyId:''
    }
}

function getEmptyToy(){
    //console.log('R',utilService.getRandomIntInclusive(0, 1) === 1)
    return { 
    imgUrl: 'hardcoded-url-for-now', 
    labels: _getToyLabels(), 
    inStock:utilService.getRandomIntInclusive(0, 1) === 1 
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

const service = (VITE_LOCAL === 'true') ? local : remote
export const toyService = { 
    getEmptyMsg, getEmptyReview, 
    getEmptyToy, getDefaultFilter,
    getLabels, ...service 
}

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.toyService = toyService
