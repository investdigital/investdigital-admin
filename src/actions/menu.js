import axios from 'axios';
import {
    ROOT_URL,
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    FETCH_MENU_LIST,
    ADD_MENU_SUCCESS,
    ADD_MENU_ERROR,
    getAuthorizedHeader
} from './types';

export function requestError(error) {
    return {
      type: REQUEST_ERROR,
      payload: error
    };
  }

// 请求菜单列表
export function fetchMenuList( callback ) {
    return function ( dispatch ) {
        axios.get(`${ROOT_URL}/menu`, {
            headers: getAuthorizedHeader()
        })
        .then((response) => {
            dispatch({ type: FETCH_MENU_LIST, payload: response })
        })
        .catch((err) => {
            dispatch(requestError(err.message));
            callback(err.message);
        });
    }
}

// 添加新的菜单
export function addMenu ({ menuname, menuurl }, callback) {
    console.log(`addMenu: ${menuname}, ${menuurl}`);
    return function ( dispatch ) {
        axios.post(`${ROOT_URL}/menu`, { menuname, menuurl }, {
            headers: getAuthorizedHeader()
        })
        .then(( response ) => {
            if (response.data.status === 1) {
                dispatch({ type: ADD_MENU_SUCCESS, payload: response });
                callback();
            } else {
                dispatch({ type: ADD_MENU_ERROR, payload: response.data.message });
                callback(response.data.message);
            }
        })
        .catch(( err ) => {
            dispatch(requestError(err.message));
            callback(err.message);
        })
    }
}
