import {
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    FETCH_ROLE_LIST,
    ADD_ROLE_SUCCESS,
    ADD_ROLE_ERROR
} from '../actions/types';

const INITIAL_STATE = { all: null };

export default function (state = INITIAL_STATE, action ) {
    switch(action.type) {
        case FETCH_ROLE_LIST:
            return { ...state, all:action.payload.data.data };
        case ADD_ROLE_SUCCESS:
            return {...state, addSuccess: true};
        case ADD_ROLE_ERROR: 
            return {...state, addSuccess: false};
    }
    return state;
}
