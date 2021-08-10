import {SET_AUTH, LOGOUT} from '../actions/auth'

const initialState = {
    isLoggedIn: false,
    jwt: null, // Se va a enviar en cada request HTTP en un header (lo haremos con interceptors) + storage
}

export const authReducer = (state= initialState, action) => {
    switch (action.type){
        case SET_AUTH : {
            const {jwt} = action.payload;
            return {
                isLoggedIn: true,
                jwt,
            }
        }
        case LOGOUT: {
            return initialState;
        }
        default:
            return state;
    }
}
