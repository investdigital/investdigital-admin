import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const logo = '../../screenshot/WechatIMG3.png';

class Header extends  Component {
	renderLoginLinks() {
		if (this.props.authenticated) {
			// show a link to sign out
			return  <p key="nav1" className="loginexit"><Link to="/signout"><i className="fa fa-sign-in"></i> <span>退出登录</span></Link></p>
		} else {
			return [
				<p key="nav2" className="loginbtn"><Link to="/signin"><i className="fa fa-sign-in"></i> <span>登录</span></Link></p>,
			];
		}
	}
	render() {
		return (
			<header className="main-header">
				<Link to="/signin" className="logo">
					<span className="logo-mini"><img src={logo} style={{width:50+'px'}} /></span>
					<span className="logo-lg"><img src={logo} style={{width:80+'px'}} /></span>
				</Link>
				<nav className="navbar navbar-static-top">
					<Link to="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
						<span className="sr-only">Toggle navigation</span>
					</Link>
					{ this.renderLoginLinks() }
				</nav>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}
export default connect(mapStateToProps)(Header);