export const SET_USERS = 'SET_USER'

const initialState={
    users:[]
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Toys
        case SET_USERS:
            return { ...state, toys: action.toys }
        
    default:
            return state
    }
}