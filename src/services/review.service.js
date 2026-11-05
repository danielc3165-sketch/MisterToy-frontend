import { httpService } from './http.service'

export const reviewService = {
	query,
	add,
	remove,
	getDefultFilter,
}

async function query(filterBy) {
	console.log('filterBy:', filterBy)
	var queryStr = !filterBy ? '' : `?byToyId=${filterBy.byToyId}&byUserId=${filterBy.byUserId}`
	return await httpService.get(`review${queryStr}`)
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, toyId, userId }) {
	return await httpService.post(`review`, { txt, toyId, userId })
}

function getDefultFilter() {
	return {
		byUserId: '',
		byToyId: '',
	}
}