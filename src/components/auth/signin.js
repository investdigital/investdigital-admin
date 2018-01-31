import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom'
import { signinAction } from '../../actions/auth';
import './style/signin.css';

class Signin extends Component {
	handlePhoneSubmit() {
        const mobilephone = this.refs.mobilephone.value;
        const password = this.refs.password.value;
        if (mobilephone && password) {
			this.props.signinAction({ mobilephone, password }, ()=>{ console.log('signin callback');});
        }
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger alert-dismissable">
					{this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		// console.log(this.props);
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		if(this.props.loggedIn) {
			return <Redirect to={from}/>;
		}

		return (
			<div className="mainbgc">
                <div className="login-box">
                    <div className="login-box-body">
                        <div className="signinWay text-center g-pt-50">
                            <ul className="row loginul">
                                <li className="col-xs-6 loginli"> <Link className="signinTypeBar g-pb-3" to="/signin">手机登录</Link></li>
                                <li className="col-xs-6 loginli"><Link className=" g-pb-3" to="/signinemail">邮箱登录</Link></li>
                            </ul>
                        </div>
                        <div className="form-style">
                            <div className="form-signin"  >
                                <select name="" id="" className="input inputwidth form-group"> +86
                                    <option value="1">中国 + 86</option>
                                    <option value="2">美国 + 1</option>
                                    <option value="3">英国 + 44</option>
                                    <option value="4">日本 + 81</option>
                                </select>
                                <input className="input inputwidth form-group" type="text" placeholder="请输入手机号" ref="mobilephone" /> <br />
                                <input className="input inputwidth form-group" type="password" placeholder="请输入密码" ref="password" /><br />
                                <div className="form-group">
                                    <button className="btn form-login" onClick={this.handlePhoneSubmit.bind(this)}>登录</button>
                                </div>
                                <div className="form-group forgetpwd">
                                    <a className="" href="/forgetpsw">忘记密码 ?</a>
                                </div>
                                {this.renderAlert()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	// console.log(state);
	return {
		loggedIn: state.auth.authenticated,
		errorMessage: state.auth.error
	};
}

export default connect(mapStateToProps, { signinAction })(Signin);