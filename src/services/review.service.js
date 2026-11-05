import { httpService } from './http.service'

export const reviewService = {
	add,
	query,
	remove,
}

async function query() {
	//var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
	return await httpService.get(`review`)
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, toyId, userId }) {
	return await httpService.post(`review`, { txt, toyId, userId })
}