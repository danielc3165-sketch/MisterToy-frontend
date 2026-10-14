import { toyService } from "../../services/toy.service.local.js"
import { store } from '../store.js'
import { SET_TOYS, ADD_TOY, UPDATE_TOY, REMOVE_TOY } from "../reducers/toy.reducer.js"

export function loadToys() {
	//const filterBy = store.getState().carModule.filterBy

	return toyService.query()
		.then(toys => {
			store.dispatch({ type: SET_TOYS, toys })
		})
		.catch(err => {
			console.log('car action -> Cannot load toys', err)
			throw err
		})
}

export function removeToy(toyId) {
	return toyService
		.remove(toyId).then(() => {
			store.dispatch({ type: REMOVE_TOY, toyId })
		})
		.catch(err => {
			console.log('car action -> Cannot remove toy', err)
			throw err
		})
}

export function removeCarOptimistic(carId) {
	store.dispatch({ type: REMOVE_CAR, carId })
	

	return carService.remove(carId)
		.then(() => {
			showSuccessMsg('Removed Car!')
		})
		.catch(err => {
			store.dispatch({ type: CAR_UNDO })
			console.log('car action -> Cannot remove car', err)
			throw err
		})
}

export function saveToy(toy) {
	const type = toy._id ? UPDATE_TOY : ADD_TOY
    
	return toyService.save(toy)
		.then(savedToy => {
			console.log('savedToy',savedToy)
			store.dispatch({ type, toy: savedToy })
			return savedToy
		})
		.catch(err => {
			console.log('toy action -> Cannot save toy', err)
			throw err
		})
}

export function setFilterBy(filterBy) {
	store.dispatch({ type: SET_FILTER_BY, filterBy })
}

