// export const ROOT_URL = 'http://59.110.17.41:9494/api';
// export const ROOT_URL = 'http://192.168.1.145:31554';
// export const ROOT_URL = 'http://nmba-admin.ziyun56.com:57080/api';
export const ROOT_URL = 'http://192.168.1.111:8081/oxchains';


export const AUTH_USER = 'auth_user';                               //登录
export const UNAUTH_USER = 'unauth_user';                           //退出登录
export const AUTH_ERROR = 'auth_error';                             //登录失败

export const REQUEST_SUCCESS = 'request_success';                   //http请求正确
export const REQUEST_ERROR = 'request_error';                       //http请求返回错误

export const FETCH_JURISDICTION_LIST = 'fetch_jurisdiction_list';   //获取权限列表
export const ADD_JURISDICTION_SUCCESS = 'add_jurisdiction_success'; //添加权限成功
export const ADD_JURISDICTION_ERROR = 'add_jurisdiction_error';     //添加权限失败

export const FETCH_ROLE_LIST = 'fetch_role_list';                   //获取角色列表
export const ADD_ROLE_SUCCESS = 'add_role_success';                 //添加角色成功
export const ADD_ROLE_ERROR = 'add_role_error';                     //添加角色失败

export const FETCH_MENU_LIST = 'fetch_menu_list';                   //获取菜单列表
export const ADD_MENU_SUCCESS = 'add_menu_success';                 //添加菜单成功
export const ADD_MENU_ERROR = 'add_menu_error';                     //添加菜单失败

export const FETCH_USER_LIST = 'fetch_user_list';                   //获取用户列表
export const ADD_USER_SUCCESS = 'add_user_success';                 //注册用户成功
export const ADD_USER_ERROR = 'add_user_error';                     //注册用户失败

export const FETCH_VERIFY_CODE = 'request_verifycode';              //注册获取验证码
export const EMAIL_SIGNUP_USER = 'email_signup_user';               //邮箱注册
export const EMAIL_ISLIVE = 'email_islive';                         //邮箱是否激活提示


export function getAuthorizedHeader() {
	return { authorization: 'Bearer '+localStorage.getItem('token') }
}

export function requestError(error) {
    return {
        type: REQUEST_ERROR,
        payload: error
    };
}
