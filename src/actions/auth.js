import axios from 'axios';
import {
	ROOT_URL,
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_VERIFY_CODE,
	EMAIL_SIGNUP_USER,
	EMAIL_ISLIVE,
	getAuthorizedHeader
} from './types';

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

// 手机登录
export function signinAction({ mobilephone, password }, callback) {
	// debugger;
	return function(dispatch) {
		axios.post(`${ROOT_URL}/user/signin`, { mobilephone, password })
			.then(response => {
                console.log(response);
				if(response.data.status == 1) {
					localStorage.setItem('token', response.data.data.token);
				    localStorage.setItem('loginname', JSON.stringify(response.data.data.loginname));
					localStorage.setItem('mobilephone', response.data.data.mobilephone);
					dispatch({type: AUTH_USER});
					callback();
				} else {
					dispatch(authError(response.data.message));
				}
			})
			.catch((err) => {
				dispatch(authError('Bad Login'));
			});
	}
}


// 邮箱登录
export function EmailsigninAction({ email, password }) {
    console.log(`点击邮箱登录按钮传过来的数据是 ${email}, ${password}`);
    return function (dispatch) {
        axios.post(`${ROOT_URL}/user/signin`, { email, password })
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
					localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('email', response.data.data.email);
                    dispatch({ type: AUTH_USER });
                } else {
                    dispatch(authError(response.data.message));
                }
            })
            .catch((err) => {
                dispatch(authError(err.message));
            });
    };
}


// 手机注册
export function signupUser({ loginname, mobilephone, vcode, password }, callback) {
    console.log(`手机注册传送的数据: ${loginname}, ${mobilephone}, ${vcode}, ${password}`);
    return function (dispatch) {
        axios.post(`${ROOT_URL}/user/signup`, { loginname, mobilephone, vcode, password })
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    callback();
                } else {
                    // console.log(response.data.message);
                    callback(response.data.message);
                }
            })
            .catch((err) => {
                dispatch(authError(err.message));
            });
    };
}


// 注册获取验证码 && 手机找回获取验证码
export function GetverifyCode({ mobilephone }) {
    console.log("点击发送验证码带过来的手机号" + mobilephone);
    return function (dispatch) {
        axios.post(`${ROOT_URL}/user/phoneVcode?mobilephone=${mobilephone}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log(response);
                dispatch({ type: FETCH_VERIFY_CODE, payload: response });

            })
            .catch(err => (err.message));
    };
}



// 邮箱注册
export function EmialsignupUser({ loginname, email, password }, callback) {
    console.log(`邮箱注册传送的数据: ${loginname}, ${email}, ${password}`);
    return function (dispatch) {
        axios.post(`${ROOT_URL}/user/signup`, { loginname, email, password })
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    callback();
                } else {
                    callback(response.data.message);
                }
                dispatch({ type: EMAIL_SIGNUP_USER, payload: response });
            })
            .catch((err) => {
                dispatch(authError(err.message));
            });
    };
}



// 邮箱注册提示是否激活成功
export function RegisterJumptipAction({email}, callback) {
    console.log("邮箱注册是否激活提示" + email);
    return function (dispatch) {
        axios.get(`${ROOT_URL}/user/active?email=${email} `, { headers: getAuthorizedHeader() })
            .then(response => {	
                console.log(response);
                dispatch({ type: EMAIL_ISLIVE, payload: response });
            })
            .catch(err => (err.message));
    };
}


// 退出登录
export function signoutUser() {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('mobilephone');
	return {
		type: UNAUTH_USER 
	};
}
