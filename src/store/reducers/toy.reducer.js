import { toyService } from "../../services/toy.storage.js";

export const SET_TOYS = 'SET_TOYS'

const initialState={
    toys:toyService.query()
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }
        
    default:
            return state
    }
}