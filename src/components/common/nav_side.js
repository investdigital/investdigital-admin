import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavSide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current:null
		};
		this.renderLink = this.renderLink.bind(this);
	}

	renderUserInfo() {
		if(this.props.authenticated) {
			const mobilephone = JSON.parse(localStorage.getItem('mobilephone'));
			// const email = JSON.parse(localStorage.getItem('email'));
			return <div className="user-panel">
						<div className="pull-left image">
							<img src="../../screenshot/touxiang.jpg" className="img-circle" alt="User Image" style={{"width":"100px"}} />
						</div>
						<div className="pull-left info">
							<p>{mobilephone}</p>
							{/* <p>{email}</p> */}
						</div>
					</div>
		} else {
			return <div></div>
		}
	}

	handleLinkClick(e) {
		this.setState({
			current: e.target.id 
		});
	}

	renderLink({path, title, icon}) {
		return (
			<li key={path} className={this.state.current==path?'active':''} onClick={this.handleLinkClick.bind(this)}>
				<Link id={path} to={'/'+path}><i className={`fa fa-${icon}`}></i> <span>{title}</span></Link>
			</li>
		)
	}

	render() {
		const links = [
			{path:'jurisdiction', title:'权限管理', icon:'database'},
			{path:'role', title:'角色管理', icon:'link'},
			{path:'menu', title:'菜单管理', icon:'bitcoin'},
			{path:'users', title:'用户管理', icon:'users'}
		];

		return (
			<aside className="main-sidebar">
				<section className="sidebar">
					{ this.renderUserInfo() }
					<ul className="sidebar-menu">
					<li className="header">导航</li>
					{ links.map(this.renderLink) }
					</ul>
				</section>
			</aside>
		);
	}
}

function mapStateToProps(state) {
	return { 
		authenticated: state.auth.authenticated 
	};
}

export default connect(mapStateToProps)(NavSide);