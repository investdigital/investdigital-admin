import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import userReducer from './user_reduicer';
import jurisdictionReducer from './jurisdiction_reducer';
import roleReducer from './role_reducer';
import menuReducer from './menu_reducer';

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	user: userReducer,
	jurisdiction: jurisdictionReducer,
	role: roleReducer,
	menu: menuReducer
});

export default rootReducer;
