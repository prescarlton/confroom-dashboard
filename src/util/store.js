import {createStore} from 'redux';

const authReducer = (state = {auth: false}, action) => {
    switch(action.type) {
        case 'SET_UNAUTH':
            return {auth: false}
        case 'SET_AUTH':
            return {auth: true}
        default:
            return state;
    }
}

let store = createStore(authReducer);

export default store;