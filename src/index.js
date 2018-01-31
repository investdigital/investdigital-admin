import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import RequireAuth from './components/auth/require_auth';
import PrivateRoute from './components/auth/private_route';
import Welcome from './components/welcome';
import NavTop from './components/common/header';
import NavSide from './components/common/nav_side';
import Footer from './components/common/footer';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Jurisdiction from './components/jurisdiction/jurisdiction';
import Role from './components/role/role';
import Menu from './components/menu/menu';
import UserList from './components/user_list';
import UserProfile from './components/user_profile';
import Signinemail from './components/auth/signin_email';
import Signupemail from './components/auth/signup_email';


const createStoreWithMiddleware = compose(
	applyMiddleware(reduxThunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If token exist, singin automatic
if (token) {
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<NavTop />
				<NavSide/>
				<div className="content-wrapper">
					<Switch>
						<Route path="/signin" component={Signin} />
						<Route path="/signout" component={Signout} />
						<Route path="/signup" component={Signup} />
						<Route path="/signinemail" component={Signinemail} />
						<Route path="/signupemail" component={Signupemail} />
						<PrivateRoute path="/jurisdiction" component={Jurisdiction}/>
						<PrivateRoute path="/role" component={Role}/>
						<PrivateRoute path="/menu" component={Menu}/>
						<PrivateRoute path="/users" component={UserList}/>
						<PrivateRoute path="/profile" component={UserProfile} />
						<PrivateRoute path="/" component={Welcome}/>
						<Route path="/" component={Signin} />
					</Switch>
				</div>
				<Footer/>
			</div>
		</BrowserRouter>
	</Provider>, 
	document.querySelector('.wrapper')
);
