import {
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    FETCH_JURISDICTION_LIST,
    ADD_JURISDICTION_SUCCESS,
    ADD_JURISDICTION_ERROR
} from '../actions/types';

const INITIAL_STATE = { all: null };

export default function (state = INITIAL_STATE, action ) {
    switch(action.type) {
        case FETCH_JURISDICTION_LIST:
            return { ...state, all:action.payload.data.data };
        case ADD_JURISDICTION_SUCCESS:
            return {...state, addSuccess: true};
        case ADD_JURISDICTION_ERROR: 
            return {...state, addSuccess: false};
    }
    return state;
}
