import { toyService } from "../../services/toy.service.api.js"
import { store } from '../store.js'
import { SET_TOYS, ADD_TOY, UPDATE_TOY, REMOVE_TOY } from "../reducers/toy.reducer.js"

export async function loadToys(filterBy) {
	//const filterBy = store.getState().carModule.filterBy

	    try {
			const toys = await toyService.query(filterBy)
			return store.dispatch({ type: SET_TOYS, toys })
		}
		catch (err) {
			console.log('car action -> Cannot load toys', err)
			throw err
		}
}

export async function removeToy(toyId) {
	    try{
		    await toyService.remove(toyId)
		    store.dispatch({ type: REMOVE_TOY, toyId })
		}
		catch(err){
			console.log('car action -> Cannot remove toy', err)
			throw err
		}
}



export async function saveToy(toy) {
	const type = toy._id ? UPDATE_TOY : ADD_TOY
    
	try {
		const savedToy = await toyService.save(toy)
		store.dispatch({ type, toy: savedToy })
		return savedToy
		}
		catch(err){
			console.log('toy action -> Cannot save toy', err)
			throw err
		}

}

export function setFilterBy(filterBy) {
	store.dispatch({ type: SET_FILTER_BY, filterBy })
}

