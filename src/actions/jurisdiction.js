import axios from 'axios';
import {
    ROOT_URL,
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    FETCH_JURISDICTION_LIST,
    ADD_JURISDICTION_SUCCESS,
    ADD_JURISDICTION_ERROR,
    getAuthorizedHeader
} from './types';

export function requestError(error) {
    return {
      type: REQUEST_ERROR,
      payload: error
    };
  }

// 请求权限列表
export function fetchJurisdictionList( callback ) {
    return function ( dispatch ) {// ${ROOT_URL}/jurisdiction
        axios.get(`${ROOT_URL}/permission/queryAdmin/all`, {
            headers: getAuthorizedHeader()
        })
        .then((response) => {
            dispatch({ type: FETCH_JURISDICTION_LIST, payload: response })
        })
        .catch((err) => {
            dispatch(requestError(err.message));
            // callback(err.message);
        });
    }
}

// 添加权限
export function addJurisdiction ({ jname, jtype, jurl, jstatus }, callback) {
    console.log(`addJurisdiction: ${jname}, ${jtype}, ${jurl}, ${jstatus}`);
    return function ( dispatch ) {
        axios.post(`${ROOT_URL}/permission/addURI`, { jname, jtype, jurl, jstatus }, {
            headers: getAuthorizedHeader()
        })
        .then(( response ) => {
            if (response.data.status === 1) {
                dispatch({ type: ADD_JURISDICTION_SUCCESS, payload: response });
                callback();
            } else {
                dispatch({ type: ADD_JURISDICTION_ERROR, payload: response.data.message });
                callback(response.data.message);
            }
        })
        .catch(( err ) => {
            dispatch(requestError(err.message));
            callback(err.message);
        })
    }
}
