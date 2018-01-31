import axios from 'axios';
import {
    ROOT_URL,
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    FETCH_ROLE_LIST,
    ADD_ROLE_SUCCESS,
    ADD_ROLE_ERROR,
    getAuthorizedHeader
} from './types';

export function requestError(error) {
    return {
      type: REQUEST_ERROR,
      payload: error
    };
  }

// 请求角色列表
export function fetchRoleList( callback ) {
    return function ( dispatch ) {
        axios.get(`${ROOT_URL}/role/list`, { headers: getAuthorizedHeader() })
        .then((response) => {
            // console.log(response);
            dispatch({ type: FETCH_ROLE_LIST, payload: response })
        })
        .catch((err) => {
            dispatch(requestError(err.message));
            callback(err.message);
        });
    }
}

// 添加角色
export function addRole ({ rolename, roletask }, callback) {
    console.log(`addRole: ${rolename}, ${roletask}`);
    return function ( dispatch ) {
        axios.post(`${ROOT_URL}/role`, { rolename, roletask })
        .then(( response ) => {
            if (response.data.status === 1) {
                dispatch({ type: ADD_ROLE_SUCCESS, payload: response });
                callback();
            } else {
                dispatch({ type: ADD_ROLE_ERROR, payload: response.data.message });
                callback(response.data.message);
            }
        })
        .catch(( err ) => {
            dispatch(requestError(err.message));
            callback(err.message);
        })
    }
}
