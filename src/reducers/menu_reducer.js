import {
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    FETCH_MENU_LIST,
    ADD_MENU_SUCCESS,
    ADD_MENU_ERROR
} from '../actions/types';

const INITIAL_STATE = { all: null };

export default function (state = INITIAL_STATE, action ) {
    switch(action.type) {
        case FETCH_MENU_LIST:
            return { ...state, all:action.payload.data.data };
        case ADD_MENU_SUCCESS:
            return {...state, addSuccess: true};
        case ADD_MENU_ERROR: 
            return {...state, addSuccess: false};
    }
    return state;
}
